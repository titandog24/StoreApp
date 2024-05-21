import { useRef } from "react";

import { getProdctById, updateCreateProduct } from "../../actions";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Product } from "../../domain/entities/Product";
import { RootStackParams } from "../navigation/StackNavigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


export const useTanStack = (id: string) => {

    const productIdRef = useRef(id)
    const client = useQueryClient();
    const navigation = useNavigation<NavigationProp<RootStackParams>>()
    
    const { data: product } = useQuery({
        queryKey: ['products', id],
        staleTime: 1000 * 60 * 60,
        queryFn: () => getProdctById(productIdRef.current),
      })

    const mutation = useMutation({
        mutationFn: (datos: Product) => {
          return updateCreateProduct({...datos, id: productIdRef.current})!
        },
        onSuccess(datos:Product) {
          productIdRef.current = datos.id;
    
          client.invalidateQueries({queryKey: ['products', productIdRef.current]})
          client.invalidateQueries({queryKey: ['products','infinite']})
          navigation.navigate('HomeScreen')
        }
      })

    return {
        product,
        mutation
    }
}