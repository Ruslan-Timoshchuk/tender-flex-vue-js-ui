import { reactive } from 'vue'
import { URL_REST_API } from "@/rest.api.endpoints"
import { exceptionAlert } from "@/components/alerts"
import { USER_ROLE } from "@/components/constants"
import router from "@/router/index";
import axios from 'axios';

export const totalStore = reactive({
  tenders: 0,
  offers: 0,

  async refreshTotalCounts() {
    const [tenderCountResponse, offerCountResponse] = await Promise.all([
      fetchFromEndpoint(`${URL_REST_API.HOST}/${URL_REST_API.TENDERS_COUNT}`),
      fetchFromEndpoint(`${URL_REST_API.HOST}/${URL_REST_API.OFFERS_COUNT}`),
    ]);
    this.tenders = tenderCountResponse.data.count;
    this.offers = offerCountResponse.data.count;
  }
});

export const fetchFromEndpoint = async (endpointKey) => {
  return await axios.get(endpointKey, {
    withCredentials: true,
    headers: {
      'Accept': 'application/json',
    }
  });
}

export const uploadFile = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return axios.post(`${URL_REST_API.HOST}/${URL_REST_API.FILES}`, formData, {
    withCredentials: true,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data'
    }
  });
}

export const downloadFile = (fileKey) => {
  try {
    return axios.get(`${URL_REST_API.HOST}/${URL_REST_API.FILES}/${fileKey}`, {
      withCredentials: true,
      responseType: 'blob',
    });
  } catch (error) {
    exceptionAlert.activateAlert(error.response.data.message);
  }
}

export const createDocumentRecord = (document, endpointKey) => {
  return axios.post(`${URL_REST_API.HOST}/${endpointKey}`, document, {
    withCredentials: true,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
}

export const partialUpdateDocumentRecord = (document, endpointKey) => {
  return axios.patch(`${URL_REST_API.HOST}/${endpointKey}`, document, {
    withCredentials: true,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  });
}

export const navigateToTender = (tender, userRole) => {
  const navigationData = {
    name: 'bid-details',
    query: { tender_id: tender.id, contract_id: tender.contractId },
  };
  if (userRole === USER_ROLE.CONTRACTOR) {
    navigationData.query.offers = tender.offersCount;
  } else if (userRole === USER_ROLE.BIDDER && tender.offer !== null) {
    navigationData.query.offer_id = tender.offer.id;
  }
  router.push(navigationData);
};

