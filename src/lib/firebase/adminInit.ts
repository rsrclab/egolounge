import {
  getApp as adminGetApp,
  getApps as adminGetApps,
  initializeApp as adminInitializeApp,
  cert
} from "firebase-admin/app";
import { getAuth as adminGetAuth } from "firebase-admin/auth";
import serviceCredentials from "../../../service_credentials.json";

export const firebaseAdmin =
  adminGetApps().length === 0
    ? adminInitializeApp(
        {
          credential: cert(serviceCredentials as any)
        },
        "firebase-admin"
      )
    : adminGetApp("firebase-admin");

export const adminAuth = adminGetAuth(firebaseAdmin);
