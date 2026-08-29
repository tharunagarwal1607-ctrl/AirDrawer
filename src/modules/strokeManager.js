export class StrokeManager {
  constructor() {
    this.strokes = [];
    this.undoStack = [];
    this.redoStack = [];
    this._nextId = 1;
  }

  addStroke(points, color, lineWidth, glowIntensity) {
    const newStroke = {
      id: this._nextId++,
      points: [...points],
      color,
      lineWidth,
      glowIntensity,
      transform: { tx: 0, ty: 0, scale: 1, rotation: 0 },
    };
    this.strokes.push(newStroke);
    this.undoStack.push({ type: 'add', stroke: newStroke });
    this.redoStack = []; // Clear redo stack on new action
    return newStroke;
  }

  removeStroke(id) {
    const stroke = this.getStroke(id);
    if (!stroke) return;
    this.strokes = this.strokes.filter(s => s.id !== id);
    this.undoStack.push({ type: 'erase', stroke });
    this.redoStack = []; // Clear redo stack on new action
  }

  undo() {
    const action = this.undoStack.pop();
    if (!action) return;

    if (action.type === 'add') {
      this.strokes = this.strokes.filter(s => s.id !== action.stroke.id);
    } else if (action.type === 'erase') {
      // Restore in original creation order (ids are assigned monotonically)
      this.strokes.push(action.stroke);
      this.strokes.sort((a, b) => a.id - b.id);
    }
    this.redoStack.push(action);
  }

  redo() {
    const action = this.redoStack.pop();
    if (!action) return;

    if (action.type === 'add') {
      this.strokes.push(action.stroke);
      this.strokes.sort((a, b) => a.id - b.id);
    } else if (action.type === 'erase') {
      this.strokes = this.strokes.filter(s => s.id !== action.stroke.id);
    }
    this.undoStack.push(action);
  }

  clear() {
    this.strokes = [];
    this.undoStack = [];
    this.redoStack = [];
  }

  // Returns array of strokes that intersect with the given circle (x, y, radius)
  findIntersectingStrokes(x, y, radius) {
    const hits = [];
    for (const stroke of this.strokes) {
      if (this._doesStrokeIntersectCircle(stroke, x, y, radius)) {
        hits.push(stroke.id);
      }
    }
    return hits;
  }

  getStroke(id) {
    return this.strokes.find(s => s.id === id);
  }

  getAllStrokes() {
    return this.strokes;
  }

  // --- Internal Math Helpers ---

  _doesStrokeIntersectCircle(stroke, cx, cy, radius) {
    for (let i = 0; i < stroke.points.length - 1; i++) {
      const dist = this._distanceToSegment(
        cx, cy,
        stroke.points[i].x, stroke.points[i].y,
        stroke.points[i + 1].x, stroke.points[i + 1].y
      );

      // Account for line width in intersection check.
      // E.g., if a line is 10px wide, and radius is 15px, they intersect if dist <= 20
      if (dist <= radius + (stroke.lineWidth / 2)) {
        return true;
      }
    }

    if (stroke.points.length === 1) {
      const dx = cx - stroke.points[0].x;
      const dy = cy - stroke.points[0].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist <= radius + (stroke.lineWidth / 2)) return true;
    }

    return false;
  }

  _distanceToSegment(px, py, x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    if (dx === 0 && dy === 0) {
      const ddx = px - x1;
      const ddy = py - y1;
      return Math.sqrt(ddx * ddx + ddy * ddy);
    } // the stroke is a single point loosely speaking

    const t = ((px - x1) * dx + (py - y1) * dy) / (dx * dx + dy * dy);
    if (t < 0) {
      const ddx = px - x1;
      const ddy = py - y1;
      return Math.sqrt(ddx * ddx + ddy * ddy);
    } else if (t > 1) {
      const ddx = px - x2;
      const ddy = py - y2;
      return Math.sqrt(ddx * ddx + ddy * ddy);
    }

    const nearestX = x1 + t * dx;
    const nearestY = y1 + t * dy;
    const ddx = px - nearestX;
    const ddy = py - nearestY;

    return Math.sqrt(ddx * ddx + ddy * ddy);
  }
}
