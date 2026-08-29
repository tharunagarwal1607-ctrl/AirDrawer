export class InteractionEngine {
  constructor(strokeManager) {
    this.strokeManager = strokeManager;

    // Erase settings
    this.eraseRadius = 30; // Radius around fingertip
  }

  // --- Erase Mode ---
  handleErase(x, y) {
    const hits = this.strokeManager.findIntersectingStrokes(x, y, this.eraseRadius);
    for (const id of hits) {
      this.strokeManager.removeStroke(id);
    }
  }
}
