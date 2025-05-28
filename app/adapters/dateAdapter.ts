export async function dateAdapter(date:any) {
    const dateAdapted = new Intl.DateTimeFormat(("es-ES"),{
  day: '2-digit',
  month: '2-digit',
  year: 'numeric'
}).format(date)
return dateAdapted
} 