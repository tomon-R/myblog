/**
 * Generic classification for Custom Errors
 */

export abstract class CustomError extends Error {
  status: CustomErrorStatus;
  constructor(status: CustomErrorStatus, name: string, message: string) {
    super(message);
    this.name = name;
    this.status = status;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  addChildName(childName: string): void {
    this.name = this.name + "." + childName;
  }

  getStatusCode(): CustomErrorStatusCode {
    return CustomErrorCodeMapper(this.status);
  }
}

// Reffered: https://pc-guide.net/errorcode/
export type CustomErrorStatus =
  | "BadRequest"
  | "Unauthorized"
  | "NotFound"
  | "InternalServerError"
  | "Unknown";

export type CustomErrorStatusCode = number;

export function CustomErrorCodeMapper(
  errorStatus: CustomErrorStatus
): CustomErrorStatusCode {
  switch (errorStatus) {
    case "BadRequest":
      return 400;
    case "Unauthorized":
      return 401;
    case "NotFound":
      return 404;
    case "InternalServerError":
      return 500;
    case "Unknown":
      return 500;
  }
}
