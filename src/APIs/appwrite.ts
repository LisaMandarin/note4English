import { message } from "ant-design-vue";
import { Client, Storage, ID } from "appwrite";

const endpoint = import.meta.env.VITE_APPWRITE_ENDPOINT;
const projectID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const bucketID = import.meta.env.VITE_APPWRITE_BUCKET_ID;

function getClient() {
  try {
    if (!endpoint || !projectID) {
      throw new Error("No endpoint or project ID");
    }

    const client = new Client().setEndpoint(endpoint).setProject(projectID);
    return client;
  } catch (error) {
    console.error("Something wrong during fetching client: ", error);
    return null;
  }
}

export async function uploadFile(file: File) {
  try {
    const client = getClient();
    if (!client) {
      throw new Error("No client");
      return;
    }
    const storage = new Storage(client);
    const result = await storage.createFile(bucketID, ID.unique(), file);
    message.success('Upload successful!');
    return result;
  } catch (error) {
    console.error("Upload failed: ", error);
    message.error('Upload failed!');
    return null;
  }
}

export async function getFileUrl(fileID: string) {
  try {
    const client = getClient();
    if (!client) {
      throw new Error("No client");
      return;
    }

    const storage = new Storage(client);
    const imageURL = storage.getFileView(bucketID, fileID);
    return imageURL;
  } catch (error) {
    console.error("Get file URL failed: ", error);
    message.error('Get file URL failed!');
    return null;
  }
}
