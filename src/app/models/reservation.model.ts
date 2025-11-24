
export interface Reservation {
  id: number;
  destination: string;    
  country: string;       
  imageUrl: string;     

  startDate: string;     
  endDate: string;       

  travelers: number;     
  totalPrice: number;    
  
  status: 'Confirmada' | 'Pendente' | 'Cancelada';

  userId: number;        
}
