import { Face } from "./face";
import { Point } from "./point";

type vector3 = {
  x: number;
  y: number;
  z: number;
};

function vector(p1: Point, p2: Point) {
  return {
    x: p2.x - p1.x,
    y: p2.y - p1.y,
    z: p2.z - p1.z,
  };
}

type TileKeys = keyof Tile | (keyof Tile)[];

// https://www.khronos.org/opengl/wiki/Calculating_a_Surface_Normal
// Set Vector U to (Triangle.p2 minus Triangle.p1)
// Set Vector V to (Triangle.p3 minus Triangle.p1)
// Set Normal.x to (multiply U.y by V.z) minus (multiply U.z by V.y)
// Set Normal.y to (multiply U.z by V.x) minus (multiply U.x by V.z)
// Set Normal.z to (multiply U.x by V.y) minus (multiply U.y by V.x)
export function calculateSurfaceNormal(p1: Point, p2: Point, p3: Point) {
  const U = vector(p1, p2);
  const V = vector(p1, p3);

  let N = {
    x: U.y * V.z - U.z * V.y,
    y: U.z * V.x - U.x * V.z,
    z: U.x * V.y - U.y * V.x,
  };

  return N;
}

export function pointingAwayFromOrigin(p: Point, v: vector3) {
  return p.x * v.x >= 0 && p.y * v.y >= 0 && p.z * v.z >= 0;
}

export function normalizeVector(v: vector3) {
  let m = Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);

  return {
    x: v.x / m,
    y: v.y / m,
    z: v.z / m,
  };
}

export class Tile {
  centerPoint: Point;
  faces: Face[];
  neighborIds: string[];
  neighbors: Tile[];
  boundary: Point[];

  constructor(centerPoint: Point, hexSize?: number) {
    if (hexSize === undefined) hexSize = 1;

    this.centerPoint = centerPoint;
    this.faces = centerPoint.getOrderedFaces();
    this.boundary = [];
    this.neighborIds = []; // this holds the centerpoints, will resolve to references after
    this.neighbors = []; // this is filled in after all the tiles have been created

    hexSize = Math.max(0.01, Math.min(1.0, hexSize));

    const neighborHash = {};
    for (let f = 0; f < this.faces.length; f++) {
      // build boundary
      this.boundary.push(
        this.faces[f].getCentroid().segment(this.centerPoint, hexSize)
      );

      // get neighboring tiles
      let otherPoints = this.faces[f].getOtherPoints(this.centerPoint);
      for (let o = 0; o < 2; o++) {
        // @ts-ignore
        neighborHash[otherPoints[o]] = 1;
      }
    }

    this.neighborIds = Object.keys(neighborHash);

    // Some of the faces are pointing in the wrong direction
    // Fix this.  Should be a better way of handling it
    // than flipping them around afterwards

    let normal = calculateSurfaceNormal(
      this.boundary[1],
      this.boundary[2],
      this.boundary[3]
    );

    if (!pointingAwayFromOrigin(this.centerPoint, normal)) {
      this.boundary.reverse();
    }
  }

  getLatLon(this: Tile, radius: number, boundaryNum?: number) {
    let point = this.centerPoint;
    if (typeof boundaryNum === "number" && boundaryNum < this.boundary.length) {
      point = this.boundary[boundaryNum];
    }
    let phi = Math.acos(point.y / radius); //lat
    let theta =
      ((Math.atan2(point.x, point.z) + Math.PI + Math.PI / 2) % (Math.PI * 2)) -
      Math.PI; // lon

    // theta is a hack, since I want to rotate by Math.PI/2 to start.  sorryyyyyyyyyyy
    return {
      latitude: (180 * phi) / Math.PI - 90,
      longitude: (180 * theta) / Math.PI,
    };
  }

  scaledBoundary(this: Tile, scale: number) {
    scale = Math.max(0, Math.min(1, scale));

    let ret = [];
    for (let i = 0; i < this.boundary.length; i++) {
      ret.push(this.centerPoint.segment(this.boundary[i], 1 - scale));
    }

    return ret;
  }

  toJson(this: Tile) {
    // this.centerPoint = centerPoint;
    // this.faces = centerPoint.getOrderedFaces();
    // this.boundary = [];
    return {
      centerPoint: this.centerPoint.toJson(),
      boundary: this.boundary.map(function (point) {
        return point.toJson();
      }),
    };
  }

  toString(this: Tile) {
    return this.centerPoint.toString();
  }

  checkExists(this: Tile, keys: TileKeys, methodName?: string) {
    const checkKey = (key: keyof Tile) => {
      if (!this[key]) {
        throw new Error(
          `${methodName} assumed computed ${key} for tile: ${this}, instead got ${this[key]}`
        );
      }
    };

    if (typeof keys === "string") {
      checkKey(keys);
    } else {
      keys.forEach((key) => checkKey(key));
    }
  }
}
