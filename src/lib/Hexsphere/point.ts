import { Face } from "./face";

export class Point {
  faces: Face[];
  x: number;
  y: number;
  z: number;

  constructor(x?: number, y?: number, z?: number) {
    if (x !== undefined && y !== undefined && z !== undefined) {
      this.x = Number(x.toFixed(3));
      this.y = Number(y.toFixed(3));
      this.z = Number(z.toFixed(3));
    } else {
      this.x = 0;
      this.y = 0;
      this.z = 0;
    }

    this.faces = [];
  }

  subdivide(
    this: Point,
    point: Point,
    count: number,
    checkPoint: (point: Point) => Point
  ) {
    const segments = [];
    segments.push(this);

    for (let i = 1; i < count; i++) {
      let np = new Point(
        this.x * (1 - i / count) + point.x * (i / count),
        this.y * (1 - i / count) + point.y * (i / count),
        this.z * (1 - i / count) + point.z * (i / count)
      );
      np = checkPoint(np);
      segments.push(np);
    }

    segments.push(point);

    return segments;
  }

  segment(this: Point, point: Point, percent: number) {
    percent = Math.max(0.01, Math.min(1, percent));

    let x = point.x * (1 - percent) + this.x * percent;
    let y = point.y * (1 - percent) + this.y * percent;
    let z = point.z * (1 - percent) + this.z * percent;

    return new Point(x, y, z);
  }

  midpoint(this: Point, point: Point) {
    return this.segment(point, 0.5);
  }

  project(this: Point, radius: number, percent: number) {
    if (percent === undefined) percent = 1.0;

    percent = Math.max(0, Math.min(1, percent));

    let mag = Math.sqrt(
      Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2)
    );
    let ratio = radius / mag;

    this.x = this.x * ratio * percent;
    this.y = this.y * ratio * percent;
    this.z = this.z * ratio * percent;
    return this;
  }

  registerFace(this: Point, face: Face) {
    this.faces.push(face);
  }

  getOrderedFaces(this: Point) {
    const workingArray = this.faces.slice();
    const ret = [];

    let i = 0;
    while (i < this.faces.length) {
      if (i === 0) {
        ret.push(workingArray[i]);
        workingArray.splice(i, 1);
      } else {
        let hit = false;
        let j = 0;
        while (j < workingArray.length && !hit) {
          if (workingArray[j].isAdjacentTo(ret[i - 1])) {
            hit = true;
            ret.push(workingArray[j]);
            workingArray.splice(j, 1);
          }
          j++;
        }
      }
      i++;
    }

    return ret;
  }

  findCommonFace(this: Point, other: Point, notThisFace: Face) {
    for (let i = 0; i < this.faces.length; i++) {
      for (let j = 0; j < other.faces.length; j++) {
        if (
          this.faces[i].id === other.faces[j].id &&
          this.faces[i].id !== notThisFace.id
        ) {
          return this.faces[i];
        }
      }
    }

    return null;
  }

  toJson(this: Point) {
    return {
      x: this.x,
      y: this.y,
      z: this.z,
    };
  }

  toString(this: Point) {
    return "" + this.x + "," + this.y + "," + this.z;
  }
}
