import { useCallback, useEffect, useMemo, useState } from "react";
import { DataContext } from "./useData";
import * as productsApi from "../services/productsService";
import * as categoriesApi from "../services/categoriesService";
import * as benefitsApi from "../services/benefitsService";
import * as testimonialsApi from "../services/testimonialsService";
import * as paymentMethodsApi from "../services/paymentMethodsService";

export function DataProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [benefits, setBenefits] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [p, c, b, t, pm] = await Promise.all([
        productsApi.listProducts(),
        categoriesApi.listCategories(),
        benefitsApi.listBenefits(),
        testimonialsApi.listTestimonials(),
        paymentMethodsApi.listPaymentMethods(),
      ]);
      setProducts(p);
      setCategories(c);
      setBenefits(b);
      setTestimonials(t);
      setPaymentMethods(pm);
    } catch (err) {
      setError(err.message || "Failed to load site data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const addProduct = async (item) => {
    const created = await productsApi.createProduct(item);
    setProducts((prev) => [...prev, created]);
  };
  const updateProduct = async (id, item) => {
    const updated = await productsApi.updateProduct(id, item);
    setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
  };
  const deleteProduct = async (id) => {
    await productsApi.deleteProduct(id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const addCategory = async (item) => {
    const created = await categoriesApi.createCategory(item);
    setCategories((prev) => [...prev, created]);
  };
  const updateCategory = async (id, item) => {
    const updated = await categoriesApi.updateCategory(id, item);
    setCategories((prev) => prev.map((c) => (c.id === id ? updated : c)));
  };
  const deleteCategory = async (id) => {
    await categoriesApi.deleteCategory(id);
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  const addBenefit = async (item) => {
    const created = await benefitsApi.createBenefit(item);
    setBenefits((prev) => [...prev, created]);
  };
  const updateBenefit = async (id, item) => {
    const updated = await benefitsApi.updateBenefit(id, item);
    setBenefits((prev) => prev.map((b) => (b.id === id ? updated : b)));
  };
  const deleteBenefit = async (id) => {
    await benefitsApi.deleteBenefit(id);
    setBenefits((prev) => prev.filter((b) => b.id !== id));
  };

  const addTestimonial = async (item) => {
    const created = await testimonialsApi.createTestimonial(item);
    setTestimonials((prev) => [...prev, created]);
  };
  const updateTestimonial = async (id, item) => {
    const updated = await testimonialsApi.updateTestimonial(id, item);
    setTestimonials((prev) => prev.map((t) => (t.id === id ? updated : t)));
  };
  const deleteTestimonial = async (id) => {
    await testimonialsApi.deleteTestimonial(id);
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
  };

  const addPaymentMethod = async (item) => {
    const created = await paymentMethodsApi.createPaymentMethod(item);
    setPaymentMethods((prev) => [...prev, created]);
  };
  const updatePaymentMethod = async (id, item) => {
    const updated = await paymentMethodsApi.updatePaymentMethod(id, item);
    setPaymentMethods((prev) => prev.map((p) => (p.id === id ? updated : p)));
  };
  const deletePaymentMethod = async (id) => {
    await paymentMethodsApi.deletePaymentMethod(id);
    setPaymentMethods((prev) => prev.filter((p) => p.id !== id));
  };

  const value = useMemo(
    () => ({
      products,
      categories,
      benefits,
      testimonials,
      paymentMethods,
      loading,
      error,
      reload: loadAll,
      addProduct,
      updateProduct,
      deleteProduct,
      addCategory,
      updateCategory,
      deleteCategory,
      addBenefit,
      updateBenefit,
      deleteBenefit,
      addTestimonial,
      updateTestimonial,
      deleteTestimonial,
      addPaymentMethod,
      updatePaymentMethod,
      deletePaymentMethod,
    }),
    [products, categories, benefits, testimonials, paymentMethods, loading, error, loadAll]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
