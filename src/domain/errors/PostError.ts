import { CustomError, CustomErrorStatus } from "@/lib/error";

/**
 * Generic classification for Post Errors
 */
export class PostError extends CustomError {
  constructor(status: CustomErrorStatus, message: string) {
    super(status, "PostError", message);
  }
}

export class NotFoundPostError extends PostError {
  constructor(message: string) {
    super("NotFound", message);
    this.addChildName("PostNotFound");
  }
}

export class FailToGetPostError extends PostError {
  constructor(message: string) {
    super("InternalServerError", message);
    this.addChildName("FailToGetPost");
  }
}

export class InvalidPostError extends PostError {
  constructor(message: string) {
    super("BadRequest", message);
    this.addChildName("InvalidPost");
  }
}

export class PostMethodNotSupportedError extends PostError {
  constructor(message: string) {
    super("BadRequest", message);
    this.addChildName("MethodNotSupported");
  }
}

export class UnknownPostError extends PostError {
  constructor(message: string) {
    super("InternalServerError", message);
    this.addChildName("Unknown");
  }
}
