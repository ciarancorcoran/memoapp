import React from 'react'

interface LoadingProps {
  loadingText?: string
}

const Loading: React.FC<LoadingProps> = ({loadingText}) => <p>{loadingText ? loadingText : 'Loading...'}</p>

export default Loading