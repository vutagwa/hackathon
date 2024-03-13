import Shared "shared";
import Http "mo:base/HTTP";

module MhoreHack {


  type UploadedFile = {
    title: Text;
  };

  // Define a map to store uploaded files by user
  var userUploadedFiles : HashMap<Shared.UserId, UploadedFile> = HashMap.create();

  // Endpoint to handle file uploads
  public func uploadFile(req : Http.Request) : async Http.Response {
    let user = req.url.query."user"; // Assuming you pass the user ID in the query string
    let body = req.body;
    
    // Check if user exists and has permissions to upload
    if (!Shared.isUserValid(user)) {
      return Http.respond { status = 401; body = null };
    }

    // Process file upload
    let title = body.title;
    userUploadedFiles[user] := { title = title };

    // Return a success response
    return Http.respond { status = 200; body = "File uploaded successfully" };
  }

  // Endpoint to handle file deletions
  public func deleteFile(req : Http.Request) : async Http.Response {
    let user = req.url.query."user";
    
    // Check if user exists and has permissions to delete
    if (!Shared.isUserValid(user)) {
      return Http.respond { status = 401; body = null };
    }

    // Check if the file exists 
    if (!HashMap.hasKey(userUploadedFiles, user)) {
      return Http.respond { status = 404; body = "File not found" };
    }

    // Delete the file
    HashMap.delete(userUploadedFiles, user);

    return Http.respond { status = 200; body = "File deleted successfully" };
  }

  public func main(request : Http.Request) : async Http.Response {
    switch (request.url.path) {
      case ["upload"]:
        return await uploadFile(request);
      case ["delete"]:
        return await deleteFile(request);
      case _:
        return Http.respond { status = 404; body = null };
    }
  }
}
