export function dateAdapter(dateString: string | Date) {
  const date = typeof dateString === 'string' ? new Date(dateString) : dateString;

  if (isNaN(date.getTime())) {
    return 'Fecha inválida';
  }

  const dateAdapted = new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date);

  return dateAdapted;
}