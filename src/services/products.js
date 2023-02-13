import api from "./api";

const productService = {};

productService.getAllProducts = () => api.get(`/product/`);
productService.getProductById = (id) => api.get(`/product/${id}`)
productService.updateProductById = (id, payload) => api.put(`/product/${id}`, { ...payload });
productService.deleteProductById = (id) => api.delete(`/product/${id}`);
productService.createProduct = (payload) => api.post("/product/", { ...payload });
productService.getUserAvailableProducts = (id) => api.get(`/product/available/${id}`);

export default productService;


