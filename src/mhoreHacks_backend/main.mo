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

  type Content = {
    id: Nat;
    text: Text;
    likes: Nat;
    dislikes: Nat;
    comments: [Text];
  };

  // Map to store uploaded files by filename
  var uploadedFiles : HashMap.Text<File> = HashMap.create();

  // Function to filter content
  shared(sharedQuery: Text): [Content] {
    let filteredContent = allContent;
    if (sharedQuery != "") {
      filteredContent := Array.filter((item: Content) =>
        Text.contains(item.text, sharedQuery)
      , filteredContent);
    }
    filteredContent;
  }

  // Fetch content
  endpoint content(query: Text): async [Content] {
    shared(query);
  }

  // Handle file uploads
  public shared({
    title,
    description,
    contentType,
    timestamp,
    content
  }: File) : async Bool {
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

  // Handle file retrieval
  public shared({
    title
  }: File) : async ?File {
    uploadedFiles.getOpt(title);
  }

  // Handle file deletion
  public shared({
    title
  }: File) : async Bool {
    switch (uploadedFiles.getOpt(title)) {
      | null => false;
      | Some(_) => {
        uploadedFiles.delete(title);
        true;
      };
    }
  }

  // Handle content interactions
  service ContentService {

    public func likeContent(contentId: Nat): async Text {
      let content = findContentById(contentId);
      
      if (content != null) {
          content.likes += 1;
          updateContent(content);
          return "Content liked successfully.";
      } else {
          return "Content not found.";
      }
    }

    public func commentOnContent(contentId: Nat, comment: Text): async Text {
      let content = findContentById(contentId);
      
      if (content != null) {
          content.comments := content.comments # [comment];
          updateContent(content);
          return "Comment added successfully!";
      } else {
          return "Content not found.";
      }
    }

    func findContentById(contentId: Nat): ?Content {
  for (content in contentMap.values()) {
    if (content.id == contentId) {
      return content;
    }
  }
  return null;
}

func updateContent(content: Content): async () {
  contentMap.put(content.id, content);
}

  }
}
