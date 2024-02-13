import ApiBase, { tryCastToApiError , toUrlParams, isValid} from './api-base';

export default class KmWorkflowsApi extends ApiBase
{
    constructor(options) {
        super(options);
    }    
    
    async getWorkflowHistory({q, f, s, sk, l , c, fo, ag }={})  {
        const params = toUrlParams( {q, f, s, sk, l , c, fo, ag });


        const token = "717F8E336DCE5918A16C44A963E38496A2CB180758C200B6EAA1443398A090AB98051729D95187930F54F2F9ADC044E1BED8C21BDBF3D81BFA7F26129FEE78E7D5D15893F4A4E4019314B62A82DFB49EB4A96D1DDDB81AF31E7BBC48FB57D9C9165F8025D8382B8B5BC0DED7B7067CA529929F727B1A555AC515A75C8AFAE9FA"
       
            //var header = {'Authorization',  `Bearer ${AuthService.getToken()}`}
        const header = { 'Authorization': 'Bearer 717F8E336DCE5918A16C44A963E38496A2CB180758C200B6EAA1443398A090AB98051729D95187930F54F2F9ADC044E1BED8C21BDBF3D81BFA7F26129FEE78E7D5D15893F4A4E4019314B62A82DFB49EB4A96D1DDDB81AF31E7BBC48FB57D9C9165F8025D8382B8B5BC0DED7B7067CA529929F727B1A555AC515A75C8AFAE9FA' }; // auth header with bearer token

        return this.http.get(`/api/v2013/workflows`, { header }, { params })
                        .then(res => res.data)
                        .catch(tryCastToApiError);
    }

    async getWorkflow(workflowId)  {
        if(!isValid(workflowId)) throw Error(`invalid value for workflowId`);
      
        return this.http.get(`/api/v2013/workflows/${encodeURIComponent(workflowId)}`)
                        .then(res => res.data)
                        .catch(tryCastToApiError);
    }

    async getBatchWorkflowDetails(batchId){ //:Promise<EKmDocumentsBatchWorkflow>  {
        if(!isValid(batchId)) throw Error(`invalid value for batchId`);

        return this.http.get(`/api/v2013/workflows/batches/${encodeURIComponent(batchId)}`)
                        .then(res => res.data)
                        .catch(tryCastToApiError);
    }

    async updateActivity(id, activityName, body) {  
        if(!isValid(id)) throw Error(`invalid value for id`);
        if(!isValid(activityName)) throw Error(`invalid value for activityName`);
        if(!isValid(body)) throw Error(`invalid value for body`);

        return this.http.put(`/api/v2013/workflows/" + id + "/activities/" + activityName`, body)
                        .then(res => res.data)
                        .catch(tryCastToApiError);
    }

    async updateBatchActivity(id, activityName, body) {
        if(!isValid(id)) throw Error(`invalid value for id`);
        if(!isValid(activityName)) throw Error(`invalid value for activityName`);
        if(!isValid(body)) throw Error(`invalid value for body`);

        return this.http.put("/api/v2013/workflows/batches/" + id + "/activities/" + activityName, body)
                        .then(res => res.data)
                        .catch(tryCastToApiError);    
    }

    async cancelWorkflow(id) {        
        if(!isValid(id)) throw Error(`invalid value for id`);
        const params  = { 'action': 'cancel' };

        return this.http.delete(`/api/v2013/workflows/${id}`,{ params })
                        .then(res => res.data)
                        .catch(tryCastToApiError);
    }

    async cancelBatch(batchId) {
        if(!isValid(batchId)) throw Error(`invalid value for batchId`);
        const params = { 'action': 'cancel' };

        return this.http.delete(`/api/v2013/workflows/batches/${batchId}`,{ params })
                        .then(res => res.data)
                        .catch(tryCastToApiError);
    }
}