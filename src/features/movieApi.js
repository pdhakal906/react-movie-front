import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const token = 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MmNjOTgxMGVlMzc2ZmQ4MTBmZTYxNTg5NThlMGMxOCIsInN1YiI6IjY0OWE0NzdiYTZkZGNiMDEzYWQ4ZDU0NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.HO3Qo0-4I8o3t5cAHtAzOisIVhUNvTLc8C65e6s8qDQ';

export const movieApi = createApi({
  reducerPath: 'movieApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
  endpoints: (builder) => ({

    nowPlaying: builder.query({
      query: () => ({
        url: '/movie/now_playing',
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: token
        }
      })
    }),


    movieByCategory: builder.query({
      query: (category) => ({
        url: `/movie/${category}`,
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: token
        }
      })
    }),

    movieVideo: builder.query({
      query: (id) => ({
        url: `/movie/${id}/videos`,
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: token
        }
      })
    }),



    movieByPage: builder.query({
      query: (query) => ({
        url: `/movie/${query.category}`,
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: token
        },
        params: {

          page: query.page

        }
      })
    }),

    movieDetails: builder.query({
      query: (id) => ({
        url: `/movie/${id}`,
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: token
        },

      })
    }),

    movieCast: builder.query({
      query: (id) => ({
        url: `/movie/${id}/credits`,
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: token
        }

      })
    }),

    movieReview: builder.query({
      query: (id) => ({
        url: `/movie/${id}/reviews`,
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: token
        }

      })
    }),

    movieRecommendation: builder.query({
      query: (id) => ({
        url: `/movie/${id}/recommendations`,
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: token
        }

      })
    }),

    // tv shows api

    tvShowByCategory: builder.query({
      query: (category) => ({
        url: `/tv/${category}`,
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: token
        }
      })
    }),

    tvShowVideo: builder.query({
      query: (id) => ({
        url: `/tv/${id}/videos`,
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: token
        }
      })
    }),

    tvShowByPage: builder.query({
      query: (query) => ({
        url: `/tv/${query.category}`,
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: token
        },
        params: {

          page: query.page

        }
      })
    }),

    tvShowDetails: builder.query({
      query: (id) => ({
        url: `/tv/${id}`,
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: token
        },

      })
    }),

    tvShowCast: builder.query({
      query: (id) => ({
        url: `/tv/${id}/aggregate_credits`,
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: token
        }

      })
    }),

    tvShowReview: builder.query({
      query: (id) => ({
        url: `/tv/${id}/reviews`,
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: token
        }
      })
    }),

    tvShowRecommendation: builder.query({
      query: (id) => ({
        url: `/tv/${id}/recommendations`,
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: token
        }
      })
    }),


    // search

    searchAll: builder.query({
      query: (query) => ({
        url: `/search/multi`,
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: token
        },
        params: {
          query: query
          // alt only write query as it has same key and value
        }
      })
    }),

    // person 


    personDetail: builder.query({
      query: (id) => ({
        url: `/person/${id}`,
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: token
        }
      })
    }),







  })
});

export const { useNowPlayingQuery, useMovieByCategoryQuery, useMovieVideoQuery, useMovieByPageQuery, useMovieDetailsQuery, useMovieCastQuery, useMovieReviewQuery, useMovieRecommendationQuery, useTvShowByCategoryQuery, useTvShowByPageQuery, useTvShowVideoQuery, useTvShowDetailsQuery, useTvShowCastQuery, useTvShowReviewQuery, useTvShowRecommendationQuery, useSearchAllQuery, usePersonDetailQuery } = movieApi