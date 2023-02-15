
import api from "./api";

const movementService = {};

movementService.getAllMovements = () => api.get(`/movement/`);
movementService.getMovementById = (id) => api.get(`/movement/${id}`)
movementService.deleteMovementById = (id) => api.delete(`/product/${id}`);
movementService.createExtractionMovement = (id, payload) => api.post(`/movement/extraction/${id}`, { ...payload });
movementService.createDepositMovement = (id, payload) => api.post(`/movement/deposit/${id}`, { ...payload });

export default movementService;


