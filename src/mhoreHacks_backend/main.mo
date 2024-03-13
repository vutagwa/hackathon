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
 
 // Define a type for payment details
  type PaymentDetails = {
    userId : Shared.UserId;
    amount : Nat64;
    currency : Text;
    // Add more payment details as needed
  };

  // Function to process payment
  public func processPayment(details : PaymentDetails) : async Text {
    // Perform payment processing here, e.g., interact with a cryptocurrency payment gateway
    // For simplicity, let's assume the payment is successful
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
}


