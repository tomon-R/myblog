import { CustomError, CustomErrorStatus } from "@/lib/error";

/**
 * Generic classification for Category Errors
 */
export class CategoryError extends CustomError {
  constructor(status: CustomErrorStatus, message: string) {
    super(status, "CategoryError", message);
  }
}

export class NotFoundCategoryError extends CategoryError {
  constructor(message: string) {
    super("NotFound", message);
    this.addChildName("CategoryNotFound");
  }
}

export class FailToGetCategoryError extends CategoryError {
  constructor(message: string) {
    super("InternalServerError", message);
    this.addChildName("FailToGetCategory");
  }
}

export class CategoryMethodNotSupportedError extends CategoryError {
  constructor(message: string) {
    super("BadRequest", message);
    this.addChildName("MethodNotSupported");
  }
}
