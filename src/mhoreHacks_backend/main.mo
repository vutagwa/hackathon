import Shared "shared";
import Http "mo:base/Http";
import Blob "mo:base/Blob";
import Debug "mo:base/Debug";
import HashMap "mo:base/HashMap";

module MhoreHack {

  // Define common types and variables
  type UploadedFile = {
    title: Text;
    description: Text;
  };

  type User = {
    email: Text;
    password: Text;
  };
  // Define a type for content
type Content = {
  id: Nat;
  text: Text;
  likes: Nat;
  dislikes: Nat;
  comments: [Text];
};


public shared(query: Text) : [Content] {
  let filteredContent = allContent;
  if (query != "") {
    filteredContent := Array.filter((item: Content) =>
      Text.contains(item.text, query)
    , filteredContent);
  }
  filteredContent;
}

// Define an endpoint to fetch content
endpoint content(query: Text) : async [Content] {
  shared(query);
}


  var users : HashMap.Text<Text, User> = HashMap.fromList([]);

  // Functions for user management
  actor UserManagement {
    public func addUser(email: Text, password: Text) : async Bool {
      if (!HashMap.member(email, users)) {
        users.put(email, {email = email; password = password});
        return true;
      } else {
        return false;
      }
    };

    public func authenticate(email: Text, password: Text) : async Bool {
      switch (users.getOpt(email)) {
        case (null) {
          return false; // User not found
        }
        case (Some(user)) {
          return user.password == password; // Check if password matches
        }
      }
    };
  }

  // handle user login and registration
  service {
    public func login(email: Text, password: Text) : async Bool {
      return await UserManagement.authenticate(email, password);
    };

    public func register(email: Text, password: Text) : async Bool {
      return await UserManagement.addUser(email, password);
    };
  };

  // handle file uploads and deletions
  service {
    public func handleUpload(file: Blob.Blob) : async Text {
    let fileName = Text.fromUtf8(file.fileName);

    Debug.print("uploaded file: " # fileName);

    return fileName;
  }
  // Define a map to store uploaded files by filename
  var uploadedFiles : HashMap.Text<Text, Blob.Blob> = HashMap.create();

  // Function to handle file deletion
  public func deleteFile(req : Http.Request) : async Http.Response {
    let fileName = req.url.query."fileName";

    if (!HashMap.hasKey(uploadedFiles, fileName)) {
      return Http.respond { status = 404; body = "File not found" };
    }

    HashMap.delete(uploadedFiles, fileName);

    return Http.respond { status = 200; body = "File deleted successfully" };
  }
}

  }

  // Endpoint to handle payment requests
  service {
    public func handlePayment(req : Http.Request) : async Http.Response {
      // Handle payment request logic here
    };
  }

  // Endpoint to fetch content from external API
 // Endpoint to handle payment requests
service {
  public func handlePayment(req : Http.Request) : async Http.Response {
    let body = await Http.getBody(req);
    let details = decodeJson(body);
    let result = await processPayment(details);
    return Http.respond { status = 200; body = "You have successfully subscribed to the selected payment plan" };
  }
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
}
