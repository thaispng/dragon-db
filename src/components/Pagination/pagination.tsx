"use client"

import type React from "react"
import "./pagination.css"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  totalItems: number
  itemsPerPage: number
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
}) => {
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  const renderPageNumbers = () => {
    const pageNumbers = []

    const maxVisiblePages = 5
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1)
    }

    if (startPage > 1) {
      pageNumbers.push(
        <button key="first" className="pagination-button" onClick={() => onPageChange(1)}>
          1
        </button>,
      )

      if (startPage > 2) {
        pageNumbers.push(
          <span key="ellipsis-start" className="pagination-ellipsis">
            ...
          </span>,
        )
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`pagination-button ${currentPage === i ? "active" : ""}`}
          onClick={() => onPageChange(i)}
        >
          {i}
        </button>,
      )
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(
          <span key="ellipsis-end" className="pagination-ellipsis">
            ...
          </span>,
        )
      }

      pageNumbers.push(
        <button key="last" className="pagination-button" onClick={() => onPageChange(totalPages)}>
          {totalPages}
        </button>,
      )
    }

    return pageNumbers
  }

  const startItem = Math.min(totalItems, (currentPage - 1) * itemsPerPage + 1)
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  return (
    <div className="pagination-container">
      <div className="pagination-controls">
        <button
          className={`pagination-button prev ${currentPage === 1 ? "disabled" : ""}`}
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          aria-label="Página anterior"
        >
          &laquo; Anterior
        </button>

        <div className="pagination-numbers">{renderPageNumbers()}</div>

        <button
          className={`pagination-button next ${currentPage === totalPages ? "disabled" : ""}`}
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          aria-label="Próxima página"
        >
          Próximo &raquo;
        </button>
      </div>

      <div className="pagination-info">
        Mostrando {startItem} - {endItem} de {totalItems} itens
      </div>
    </div>
  )
}
