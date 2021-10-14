import { DidDocumentBase, HcsDidRootKey } from "did-sdk-js";

export class HcsDidDocument extends DidDocumentBase {
    public static readonly CONTEXT: string = "@context";
    public static readonly ID: string = "id";
    public static readonly VERIFICATION_METHOD: string = "verificationMethod";
    public static readonly AUTHENTICATION: string = "authentication";
    public static readonly ASSERTION_METHOD: string = "assertionMethod";

    public static fromDocumentBase(didDocumentBase: DidDocumentBase): HcsDidDocument {
        const result = new HcsDidDocument(didDocumentBase.getId());
        result.setDidRootKey(didDocumentBase.getDidRootKey());
        return result;
    }

    public static fromJson(json: string): HcsDidDocument {
        const didDocumentBase = DidDocumentBase.fromJson(json);
        const result = new HcsDidDocument(didDocumentBase.getId());
        result.setDidRootKey(didDocumentBase.getDidRootKey());
        return result;
    }

    public getDidDocument(): any {
        const rootObject = {};
        rootObject[HcsDidDocument.CONTEXT] = [
            'https://www.w3.org/ns/did/v1',
            'https://ns.did.ai/transmute/v1'
        ];
        rootObject[HcsDidDocument.ID] = this.getId();
        rootObject[HcsDidDocument.VERIFICATION_METHOD] = [
            this.getDidRootKey().toJsonTree()
        ];
        rootObject[HcsDidDocument.AUTHENTICATION] = this.getDidRootKey().getId();
        rootObject[HcsDidDocument.ASSERTION_METHOD] = [HcsDidRootKey.DID_ROOT_KEY_NAME];
        return rootObject;
    }
}