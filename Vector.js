/**
 * A class representing a 2-dimensional vector.
 */
export class Vector2 {
  /**
   * Creates a new `Vector2` instance.
   * @param {number} [x] - The x-coordinate of the vector.
   * @param {number} [y] - The y-coordinate of the vector.
   */
  constructor(x, y) {
    this.x = x ?? 0;
    this.y = y ?? 0;
  }

  /**
   * Adds a vector to this vector.
   * @param {Vector2} vec - The vector to add.
   * @returns {Vector2} A reference to this vector.
   */
  add(vec) {
    this.x += vec.x;
    this.y += vec.y;
    return this;
  }

  /**
   * Subtracts a vector from this vector.
   * @param {Vector2} vec - The vector to subtract.
   * @returns {Vector2} A reference to this vector.
   */
  subtract(vec) {
    this.x -= vec.x;
    this.y -= vec.y;
    return this;
  }

  /**
   * Multiplies this vector by a scalar value.
   * @param {number} scalar - The scalar value to multiply by.
   * @returns {Vector2} A reference to this vector.
   */
  multiply(scalar) {
    this.x *= scalar;
    this.y *= scalar;
    return this;
  }

  /**
   * Divides this vector by a scalar value.
   * @param {number} scalar - The scalar value to divide by.
   * @returns {Vector2} A reference to this vector.
   */
  divide(scalar) {
    this.x /= scalar;
    this.y /= scalar;
    return this;
  }

  /**
   * Calculates the magnitude of this vector.
   * @returns {number} The magnitude of this vector.
   */
  magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  /**
   * Normalizes this vector.
   * @returns {Vector2} A reference to this vector.
   */
  normalize() {
    const mag = this.magnitude();
    if (mag !== 0) {
      this.x /= mag;
      this.y /= mag;
    }
    return this;
  }

  /**
   * Calculates the distance between this vector and another vector.
   * @param {Vector2} vec - The other vector.
   * @returns {number} The distance between the two vectors.
   */
  distanceTo(vec) {
    const dx = this.x - vec.x;
    const dy = this.y - vec.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  /**
   * Returns a copy of this vector
   * @returns {Vector2} A copy of this vector
   */
  copy() {
    return new Vector2(this.x, this.y);
  }
}
