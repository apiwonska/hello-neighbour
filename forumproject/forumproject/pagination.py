from rest_framework import pagination 

class StandrdResultsSetPagination(pagination.PageNumberPagination):
    page_size = 2
    page_size_query_param = 'page_size'
    max_page_size = 10000