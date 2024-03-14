import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Http "mo:base/Http";
import Blob "mo:base/Blob";


module MhoreHack {

type File = {
    contentType: Text;
    title: Text;
    description: Text;
    timestamp: Text;
    content: Text;
  };

  type User = {
    email: Text;
    password: Text;
  };

  type Content = {
    id: Nat;
    text: Text;
    likes: Nat;
    dislikes: Nat;
    comments: [Text];
  };

  //map to store uploaded files by filename
  var uploadedFiles : HashMap<Text, Blob.Blob> = HashMap.create();

  //function to filter content
  shared(sharedQuery: Text): [Content] {
    let filteredContent = allContent;
    if (sharedQuery != "") {
      filteredContent := Array.filter((item: Content) =>
        Text.contains(item.text, sharedQuery)
      , filteredContent);
    }
    filteredContent;
  }

  // fetch content
  endpoint content(query: Text): async [Content] {
    shared(query);
  }

  // Define a service for user management
  service UserManagement {

    public func addUser(email: Text, password: Text): async Bool {
      if (!HashMap.member(email, users)) {
        users.put(email, {email = email; password = password});
        return true;
      } else {
        return false;
      }
    };

    public func authenticate(email: Text, password: Text): async Bool {
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

  //user login and registration
  service {
    public func login(email: Text, password: Text): async Bool {
      return await UserManagement.authenticate(email, password);
    };

    public func register(email: Text, password: Text): async Bool {
      return await UserManagement.addUser(email, password);
    };
  }

  var uploadedFiles : HashMap.Text<CreatorBackend.File> = HashMap.create();

  public shared({
    type: Text;
    title: Text;
    description: Text;
    timestamp: Text;
    content: Text;
  }) : async Bool {
    uploadedFiles.put(file.title, file);
    true;
  };

  public shared({
    title: Text;
  }) : async [File] {
    switch (uploadedFiles.getOpt(title)) {
      | null => [];
      | optFile => [? optFile];
    }
  };

  public shared(): async [File] {
    uploadedFiles.values;
  };

  public shared({
    title: Text;
  }) : async Bool {
    uploadedFiles.delete(title);
    true;
  };

  public shared({
    title: Text;
    content: Text;
  }) : async Bool {
    switch (uploadedFiles.getOpt(title)) {
      | null => false;
      | Some(file) => {
        let updatedFile = { file with content = content };
        uploadedFiles.put(title, updatedFile);
        true;
      };
    }
  };

  // handle file uploads
  public shared({
    title: Text;
    description: Text;
    contentType: Text;
    timestamp: Text;
    content: Text;
  }) : async Bool {
    let newFile = {
      contentType = contentType;
      title = title;
      description = description;
      timestamp = timestamp;
      content = content;
    };

    uploadedFiles.put(title, newFile);
    true;
  }

  //handle file deletion
  public shared({
    title: Text;
  }) : async Bool {
    switch (uploadedFiles.getOpt(title)) {
      | null => false;
      | Some(_) => {
        uploadedFiles.delete(title);
        true;
      };
    }
  }

  //handle file retrieval
  public shared({
    title: Text;
  }) : async ?File {
    uploadedFiles.getOpt(title);
  }

  //handle payment requests
  aactor PaymentBackend {

  public func processPayment(userId: Text, amount: Nat, currency: Text) : async Text {
    let paymentSuccessful = await simulatePaymentProcessing(amount);
    if (paymentSuccessful) {
      return "Payment processed successfully for " # userId # " of amount " # Nat.toText(amount) # " " # currency;
    } else {
      return "Payment failed for " # userId # ". Please try again.";
    }
  }

  private func simulatePaymentProcessing(amount: Nat) : async Bool {
    
    let delay = amount * 100000; 
    await Time.sleep(delay);
    return true;
  }


};


  // handle content interactions
  service ContentService {
    public func likeContent(contentId: Shared.ContentId): async () {
    let content = await Backend.getContentById(contentId);

    if (content != null) {
        content.likes += 1;

        await Backend.updateContent(content);
       
        return "Content liked successfully.";
    } else {
        return "Content not found.";
    }
}

    public func commentOnContent(contentId: Shared.ContentId, comment: Text): async () {
  let foundContent = findContentById(contentId);
  
  if (foundContent != null) {
    foundContent.comments := foundContent.comments # [comment];
        updateContent(foundContent);
    
    
    Debug.print("Comment added successfully!");
  } else {
    
    Debug.print("Content not found.");
  }
}


func findContentById(contentId: Shared.ContentId): ?Content {

  return contentMap[contentId];
}


func updateContent(content: Content): async () {
  await saveContent(content);
}


var contentMap : HashMap<Shared.ContentId, Content> = HashMap.create();


func saveContent(content: Content): async () {
  Debug.print("Content saved:");
  Debug.print(content);
}
  }
  
};
