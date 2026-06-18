

type BaseSuccessResponse<T> = {
    success: true
    message: string
    data: T
  }
  
  type BaseListResponse<T> = {
    success: true
    message: string
    data: {
      nodes: T[]
    }
  }
  
  type BaseErrorResponse = {
    success: false
    message: string
    error: {
      message: string
    }
  }
  
  export type BaseResponseProps<T> =
    | BaseErrorResponse
    | BaseSuccessResponse<T>
    | BaseListResponse<T>


const normalizeResponse = <T>(response: T | T[]): BaseResponseProps<T> => {
    if (response instanceof Error) {
        return {
            success: false,
            message: 'Error fetching data',
            error: {
                message: response.message,
            },
        }
    }
    
    if (Array.isArray(response)) {
        return {
            success: true,
            message: 'Data fetched successfully',
            data: {
                nodes: response,
            },
        }
    }

    return {
        success: true,
        message: 'Data fetched successfully',
        data: response,
        
    }
}

export default normalizeResponse
