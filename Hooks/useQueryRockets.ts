import { Rocket } from './../types/type';
import { request } from 'graphql-request';
import { useQuery } from 'react-query';
import { GET_ROCKET } from '../queries/queries';

interface RocketsRes {
  rockets: Rocket[];
}

export const fetchRockets = async () => {
  const { rockets: data } = await request<RocketsRes>(
    'https://api.spacex.land/graphql/',
    GET_ROCKET
  );
  return data;
};

export const useQueryRockets = () => {
  return useQuery<Rocket[], Error>({
    queryKey: 'rokets',
    queryFn: fetchRockets,
    staleTime: 3000,
    refetchOnWindowFocus: false,
    refetchInterval: 5000
  });
};
