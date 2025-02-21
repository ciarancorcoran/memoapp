import React from 'react'

interface ErrorProps {
  error: Error
}

const Error: React.FC<ErrorProps> = ({ error }) => <p>{`There was an error: ${error}`}</p>

export default Error