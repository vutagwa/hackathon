import Shared "shared";
import Http "mo:base/Http";
import Blob "mo:base/Blob";
import Debug "mo:base/Debug";


module MhoreHack {


  type UploadedFile = {
    title: Text;
    description: Text;
  };

  // Define a map to store uploaded files by user
  var userUploadedFiles : HashMap<Shared.UserId, UploadedFile> = HashMap.create();

  // Endpoint to handle file uploads
  public func handleUpload(file : Blob.Blob) : async Http.Response {
    let boundary = Blob.randomBoundary();
    let formData = Blob.multipartFormData({ "file": file }, boundary);

    let headers = Http.Headers.init();
    Http.Headers.set(headers, "Content-Type", "multipart/form-data; boundary=" # boundary);

    let request = Http.Request {
        url = "/api/upload";
        method = Http.Post;
        headers = headers;
        body = Http.RequestBody.fromBlob(formData);
        ...Http.Request.default
    };

    let response = await Http.request(request);
    return response;
};

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
 
 // Define a type for payment details
  type PaymentDetails = {
    userId : Shared.UserId;
    amount : Nat64;
    currency : Text;
  };

  // Function to process payment
  public func processPayment(details : PaymentDetails) : async Text {
    // Perform payment processing here, 
    Shared.activateAccount(details.userId);
    return "Account activated, you have subscribed to more DAPP";
  }

  // Endpoint to handle payment requests
  public func handlePayment(req : Http.Request) : async Http.Response {
    let body = await Http.getBody(req);
    let details = decodeJson(body);
    let result = await processPayment(details);
    return Http.respond { status = 200; body = result };
  }

  // Helper function to decode JSON
  private func decodeJson(body : Blob) : PaymentDetails {
    let json = Http.blobToText(body);
    return Json.decode<PaymentDetails>(json) # switch to your JSON decoding method
      |err| Debug.print("Error decoding JSON: " # err) # Handle error appropriately
      |ok| ok;
  }

  // Expose the endpoint to the internet
  public func main(request : Http.Request) : async Http.Response {
    switch (request.url.path) {
      case ["payment"]:
        return await handlePayment(request);
      case _:
        return Http.respond { status = 404; body = null };
    }
  }
  
  type ContentId = Nat;
  type Content = {
    id: ContentId;
    creatorId: Nat;
    text: Text;
    likes: Nat;
    dislikes: Nat;
    comments: [Text];
  };
  import Shared "shared";

actor Backend {
  public func getCreatorsContent(): async [Shared.Content] {
     let apiUrl = "https://api.example.com/creators-content"; 

    // Make an HTTP GET request to the API endpoint
    let response = await Http.fetch(apiUrl, { 
        method = Http.Method.GET;
        headers = [];
    });

    // Check if the request was successful
    if (response.status != Http.Status.OK) {
    throw Http.Error("Request failed with status code: " # Int.toText(response.status));
        return [];
  }

  public func likeContent(contentId: Shared.ContentId): async () {
    // Logic to handle liking content
  }

  public func dislikeContent(contentId: Shared.ContentId): async () {
    // Logic to handle disliking content
  }

  public func commentOnContent(contentId: Shared.ContentId, comment: Text): async () {
    // Logic to handle commenting on content
  }
}





