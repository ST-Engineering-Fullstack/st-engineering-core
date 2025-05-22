
export const MESSAGE = {
    // Success messages
    FILE_UPLOADED: "File uploaded successfully",
    FILES_UPLOADED: "Files uploaded successfully",
    FILE_SAVED_TO_DB: "File uploaded and saved to database",
    FILES_SAVED_TO_DB: "Files uploaded and saved to database",
  
    // Error messages
    NO_FILE_UPLOADED: "No file uploaded",
    NO_FILES_UPLOADED: "No files uploaded",
    INVALID_FILE_TYPE: "Invalid file type",
    FILE_TOO_LARGE: "File size exceeds limit",
    UPLOAD_FAILED: "File upload failed",
    SERVER_ERROR: "Internal server error",
    ROUTE_NOT_FOUND: "Route not found",
  } as const;
  
  export type MessageKey = keyof typeof MESSAGE;
  