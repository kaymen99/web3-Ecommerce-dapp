import { Web3Storage } from "web3.storage";

const web3storage_key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDU2RDlDMjUwNjMxMjI4Q0ZCNjhjOTYxODlBRmIzYTlhQUQ5NmY0NDAiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODAxMTEzNTc3NTYsIm5hbWUiOiJNYXJrZXRwbGFjZSJ9.URg3-GOYjNNWDNtEBcZd0Q1M2INhszJTgLI7evz30Ks";

export const IPFS_GATEWAY = "https://ipfs.io/ipfs/";

function GetAccessToken() {
  return web3storage_key;
}

function MakeStorageClient() {
  return new Web3Storage({ token: GetAccessToken() });
}

export const ipfsSaveContent = async (files) => {
  console.log("Uploading files to IPFS with web3.storage....");
  const client = MakeStorageClient();
  const cid = await client.put([files]);
  console.log("Stored files with cid:", cid);
  return cid;
};
