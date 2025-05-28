export const categoryNameMap: Record<string, string> = {
  rent: "Alquiler / Hipoteca",
  food: "Alimentación",
  restaurants: "Restaurantes y cafés",
  transport: "Transporte",
  fuel: "Combustible",
  education: "Educación",
  health: "Salud y farmacia",
  entertainment: "Entretenimiento",
  shopping: "Compras / Ropa",
  travel: "Viajes",
  utilities: "Teléfono / Internet",
  bills: "Electricidad / Agua / Gas",
  pets: "Mascotas",
  home_maintenance: "Mantenimiento del hogar",
  technology: "Tecnología",
  sports: "Gimnasio / Deportes",
  donations: "Donaciones",
  insurance: "Seguros",
  taxes: "Impuestos",
  savings: "Ahorros",
  investments: "Inversiones",
  income: "Ingresos",
  freelance: "Freelance",
  gifts: "Regalos",
  subscriptions: "Suscripciones",
  childcare: "Cuidado infantil",
  beauty: "Belleza",
  events: "Eventos / Celebraciones",
  cleaning: "Limpieza",
  other: "Otros",
}

export function categoryAdapter(category: string): string {
  return categoryNameMap[category] || category
}

