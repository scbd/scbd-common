import ApiBase, { tryCastToApiError , toUrlParams, isValid} from './api-base';

export default class KmWorkflowsApi extends ApiBase
{
    constructor(options) {
        super(options);
    }    
    
    async getWorkflowHistory({q, f, s, sk, l , c, fo, ag }={})  {
        const params = toUrlParams( {q, f, s, sk, l , c, fo, ag });

        return this.http.get(`/api/v2013/workflows`,  { params })
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
        if(!isValid(id))            throw Error(`invalid value for id`);
        if(!isValid(activityName))  throw Error(`invalid value for activityName`);
        if(!isValid(body))          throw Error(`invalid value for body`);

        return this.http.put(`/api/v2013/workflows/${id}/activities/${activityName}`, body)
                        .then(res => res.data)
                        .catch(tryCastToApiError);
    }

    async updateBatchActivity(id, activityName, body) {
        if(!isValid(id))           throw Error(`invalid value for id`);
        if(!isValid(activityName)) throw Error(`invalid value for activityName`);
        if(!isValid(body))         throw Error(`invalid value for body`);

        return this.http.put(`/api/v2013/workflows/batches/${id}/activities/${activityName}` , body)
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