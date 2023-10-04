import { Point } from "./point";

let _faceCount = 0;

export class Face {
  id: number;
  points: Point[];
  centroid?: Point;

  constructor(point1: Point, point2: Point, point3: Point, register?: boolean) {
    this.id = _faceCount++;

    if (register === undefined) {
      register = true;
    }

    this.points = [point1, point2, point3];
    if (register) {
      point1.registerFace(this);
      point2.registerFace(this);
      point3.registerFace(this);
    }
  }

  getOtherPoints(this: Face, point1: Point) {
    let other = [];
    for (let i = 0; i < this.points.length; i++) {
      if (this.points[i].toString() !== point1.toString()) {
        other.push(this.points[i]);
      }
    }
    return other;
  }

  findThirdPoint(this: Face, point1: Point, point2: Point) {
    for (let i = 0; i < this.points.length; i++) {
      if (
        this.points[i].toString() !== point1.toString() &&
        this.points[i].toString() !== point2.toString()
      ) {
        return this.points[i];
      }
    }
  }

  isAdjacentTo(this: Face, face2: Face) {
    // adjacent if 2 of the points are the same

    let count = 0;
    for (let i = 0; i < this.points.length; i++) {
      for (let j = 0; j < face2.points.length; j++) {
        if (this.points[i].toString() === face2.points[j].toString()) {
          count++;
        }
      }
    }

    return count === 2;
  }

  getCentroid(this: Face, clear: boolean = false) {
    if (this.centroid && !clear) return this.centroid;

    let x = (this.points[0].x + this.points[1].x + this.points[2].x) / 3;
    let y = (this.points[0].y + this.points[1].y + this.points[2].y) / 3;
    let z = (this.points[0].z + this.points[1].z + this.points[2].z) / 3;

    let centroid = new Point(x, y, z);

    this.centroid = centroid;

    return centroid;
  }
}
