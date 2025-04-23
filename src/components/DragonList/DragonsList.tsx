/* eslint-disable no-loop-func */
"use client"

import { useState, useEffect } from "react"
import { useDeleteDragonMutation } from "../../hooks/useDeleteDragonMutation"
import "./dragons-list.css"
import { Input } from "../Input/input"
import { Button } from "../Button/button"
import { ChevronLeft, ChevronRight, ImageOffIcon, Pen, TrashIcon, AlertTriangle, ChevronUp, ChevronDown } from "lucide-react"
import { DeleteModalPure } from "../DeleteModal/delete-modal-pure"
import { useToast } from "../../components/Toast/use-toast"
import { useNavigate } from "react-router-dom"
import { Loading } from "../Loading/Loading"

interface Dragon {
  id: string
  name: string
  type: string
  histories: string[]
  imageUrl: string
  createdAt: string
}

interface DragonsListProps {
  dragons: Dragon[]
}

type SortField = 'id' | 'name' | 'type' | 'createdAt' | null
type SortDirection = 'asc' | 'desc'

const SortIcon = ({ field, currentSortField, sortDirection }: { 
  field: SortField, 
  currentSortField: SortField, 
  sortDirection: SortDirection 
}) => {
  const isActive = currentSortField === field;
  
  return (
    <span className="sort-icon">
      <div className="sort-icon-stack">
        <ChevronUp size={14} className={`sort-icon-up ${isActive && sortDirection === 'asc' ? 'active' : ''}`} />
        <ChevronDown size={14} className={`sort-icon-down ${isActive && sortDirection === 'desc' ? 'active' : ''}`} />
      </div>
    </span>
  );
};

export function DragonsList({ dragons }: DragonsListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [selectedDragons, setSelectedDragons] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [filteredDragons, setFilteredDragons] = useState<Dragon[]>(dragons)
  const [sortField, setSortField] = useState<SortField>('name')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const itemsPerPage = 5
  const navigate = useNavigate()
  const { mutate: deleteDragon } = useDeleteDragonMutation()
  const { success, error } = useToast()
  const [showBulkDeleteModal, setShowBulkDeleteModal] = useState(false)

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  useEffect(() => {
    const delay = setTimeout(() => {
      let filtered = dragons.filter((dragon) => {
        const matchesSearch =
          dragon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          dragon.type.toLowerCase().includes(searchTerm.toLowerCase())

        const matchesFilter = !activeFilter || dragon.type.toLowerCase() === activeFilter.toLowerCase()

        return matchesSearch && matchesFilter
      })

      if (sortField) {
        filtered = [...filtered].sort((a, b) => {
          let valueA, valueB;

          if (sortField === 'id') {
            valueA = a.id
            valueB = b.id
          } else if (sortField === 'name') {
            valueA = a.name.toLowerCase()
            valueB = b.name.toLowerCase()
          } else if (sortField === 'type') {
            valueA = a.type.toLowerCase()
            valueB = b.type.toLowerCase()
          } else if (sortField === 'createdAt') {
            valueA = new Date(a.createdAt).getTime()
            valueB = new Date(b.createdAt).getTime()
          }

          if (sortDirection === 'asc') {
            return (valueA ?? '') < (valueB ?? '') ? -1 : (valueA ?? '') > (valueB ?? '') ? 1 : 0
          } else {
            return (valueA ?? '') > (valueB ?? '') ? -1 : (valueA ?? '') < (valueB ?? '') ? 1 : 0
          }
        })
      }

      setFilteredDragons(filtered)
    }, 300)

    return () => clearTimeout(delay)
  }, [searchTerm, activeFilter, dragons, sortField, sortDirection])

  const totalPages = Math.ceil(filteredDragons.length / itemsPerPage)

  const currentDragons = filteredDragons.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const toggleDragonSelection = (id: string) => {
    setSelectedDragons((prev) => (prev.includes(id) ? prev.filter((dragonId) => dragonId !== id) : [...prev, id]))
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1)
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1)
  }

  const handleDeleteDragon = (id: string) => {
    setIsLoading(true)
    deleteDragon(id, {
      onSuccess: () => {
        success("Dragão excluído", `O dragão foi removido com sucesso.`)
        setSelectedDragons((prev) => prev.filter((d) => d !== id))
        setIsLoading(false)
      },
      onError: () => {
        error("Erro ao excluir", "Não foi possível excluir o dragão. Tente novamente.")
        setIsLoading(false)
      },
    })
  }

  const handleDeleteMultiple = async () => {
    setIsLoading(true)
    let successCount = 0
    let failCount = 0

    try {
      for (const id of selectedDragons) {
        await new Promise<void>((resolve) => {
          deleteDragon(id, {
            onSuccess: () => {
              successCount = successCount + 1
              resolve()
            },
            onError: () => {
              failCount = failCount + 1
              resolve()
            },
          })
        })
      }
    } catch (err) {
      console.error("Error in bulk delete:", err)
    } finally {
      if (successCount > 0) {
        success(
          "Dragões excluídos",
          `${successCount} ${successCount === 1 ? "dragão foi removido" : "dragões foram removidos"} com sucesso.`,
        )
      }

      if (failCount > 0) {
        error("Erro ao excluir", `Não foi possível excluir ${failCount} ${failCount === 1 ? "dragão" : "dragões"}.`)
      }

      setSelectedDragons([])
      setIsLoading(false)
      setShowBulkDeleteModal(false)
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
        <Button
          key="first"
          variant="outline"
          size="small"
          onClick={() => handlePageChange(1)}
          className="pagination-button"
        >
          1
        </Button>,
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
        <Button
          key={i}
          variant={currentPage === i ? "primary" : "outline"}
          size="small"
          onClick={() => handlePageChange(i)}
          className="pagination-button"
        >
          {i}
        </Button>,
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
        <Button
          key="last"
          variant="outline"
          size="small"
          onClick={() => handlePageChange(totalPages)}
          className="pagination-button"
        >
          {totalPages}
        </Button>,
      )
    }

    return pageNumbers
  }

  if (isLoading) return <Loading />

  return (
    <div className="dragons-container">
      <div className="dragons-header">
        <h1 className="dragons-title">Coleção de Dragões</h1>
        <p className="dragons-subtitle">
          Explore nossa coleção de dragões lendários de diferentes tipos e habilidades.
        </p>
      </div>

      <div className="search-container">
        <Input
          type="search"
          placeholder="Buscar por nome ou tipo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="more-actions-container">
          {selectedDragons.length > 1 && (
            <>
              <Button
                variant="outline"
                className="ml-2 flex items-center gap-2"
                onClick={() => setShowBulkDeleteModal(true)}
              >
                <TrashIcon size={16} />
                <span className="button-text-desktop">Excluir</span> ({selectedDragons.length})
              </Button>

              {showBulkDeleteModal && (
                <div className="modal-overlay" role="dialog" aria-modal="true">
                  <div className="modal-container">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h2 className="modal-title">Excluir Dragões</h2>
                        <button
                          className="modal-close"
                          onClick={() => setShowBulkDeleteModal(false)}
                          aria-label="Fechar"
                        >
                          &times;
                        </button>
                      </div>
                      <div className="modal-body">
                        <div className="modal-icon">
                          <AlertTriangle size={24} />
                        </div>
                        <p className="modal-description">
                          Tem certeza que deseja excluir{" "}
                          <span className="item-name">{selectedDragons.length} dragões</span>? Esta ação não pode ser
                          desfeita.
                        </p>
                      </div>
                      <div className="modal-footer">
                        <button className="modal-button cancel" onClick={() => setShowBulkDeleteModal(false)}>
                          Cancelar
                        </button>
                        <button
                          className="modal-button delete"
                          onClick={() => {
                            handleDeleteMultiple()
                            setShowBulkDeleteModal(false)
                          }}
                        >
                          Excluir
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          <Button onClick={() => navigate("/CreateDragonPage")}>
            <span className="button-text-desktop">Crie um Dragão</span>
            <span className="button-text-mobile">+ Novo</span>
          </Button>
        </div>
      </div>

      {filteredDragons.length === 0 ? (
        <div className="no-results">
          <p>Nenhum dragão encontrado com o termo "{searchTerm}".</p>
          <Button
            variant="ghost"
            onClick={() => {
              setSearchTerm("")
              setActiveFilter(null)
            }}
          >
            Limpar filtros
          </Button>
        </div>
      ) : (
        <>
          <div className="dragons-table-container">
            <div className="table-scroll-container">
              <table className="dragons-table">
                <thead>
                  <tr>
                    <th className="selected-column"></th>
                    <th className="avatar-column"></th>
                    <th onClick={() => handleSort('id')} className="sortable-header">
                      ID
                      <SortIcon field="id" currentSortField={sortField} sortDirection={sortDirection} />
                    </th>
                    <th onClick={() => handleSort('name')} className="name-column sortable-header">
                      NOME
                      <SortIcon field="name" currentSortField={sortField} sortDirection={sortDirection} />
                    </th>
                    <th onClick={() => handleSort('type')} className="sortable-header">
                      TIPO
                      <SortIcon field="type" currentSortField={sortField} sortDirection={sortDirection} />
                    </th>
                    <th onClick={() => handleSort('createdAt')} className="sortable-header">
                      CRIADO EM
                      <SortIcon field="createdAt" currentSortField={sortField} sortDirection={sortDirection} />
                    </th>
                    <th>HISTORIA</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {currentDragons.map((dragon) => (
                    <tr key={dragon.id} className="dragon-row">
                      <td className="selected-column">
                        <label className="checkbox-container">
                          <input
                            type="checkbox"
                            checked={selectedDragons.includes(dragon.id)}
                            onChange={() => toggleDragonSelection(dragon.id)}
                          />
                          <span className="checkmark"></span>
                        </label>
                      </td>
                      <td className="avatar-column">
                        <div className="dragon-avatar">
                          {dragon.imageUrl ? (
                            <img
                              src={dragon.imageUrl || "/placeholder.svg"}
                              alt={`${dragon.name} avatar`}
                              className="dragon-image"
                            />
                          ) : (
                            <span className="no-image-text">
                              <ImageOffIcon size={20} />
                            </span>
                          )}
                        </div>
                      </td>

                      <td>
                        <span className="dragon-origin">{`${dragon.id.substring(0, 8)}`}</span>
                      </td>
                      <td className="name-column">
                        <span className="dragon-name">{dragon.name}</span>
                      </td>
                      <td>
                        <span className="dragon-element">{dragon.type}</span>
                      </td>
                      <td>
                        <span className="dragon-date">{new Date(dragon.createdAt).toLocaleDateString()}</span>
                      </td>
                      <td>
                        <span className="dragon-origin">
                          {dragon.histories.length > 0
                            ? dragon.histories
                                .map((history) => (history.length > 15 ? history.slice(0, 15) + "..." : history))
                                .join(", ")
                            : "Nenhuma história"}
                        </span>
                      </td>

                      <td>
                        <div className="action-buttons">
                          <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Editar"
                            className="delete-button"
                            onClick={() => navigate(`/updateDragonPage/${dragon.id}`)}
                          >
                            <Pen size={18} />
                          </Button>

                          <DeleteModalPure
                            title="Excluir Dragão"
                            description="Tem certeza que deseja excluir este item? Esta ação não pode ser desfeita."
                            itemName={dragon.name}
                            onDelete={() => handleDeleteDragon(dragon.id)}
                            buttonClassName="delete-button"
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="pagination-container">
            <div className="pagination-controls">
              <Button
                variant="default"
                size="small"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                leftIcon={<ChevronLeft size={16} />}
                className="pagination-nav-button"
              >
                Anterior
              </Button>

              <div className="pagination-numbers">{renderPageNumbers()}</div>

              <Button
                variant="default"
                size="small"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                rightIcon={<ChevronRight size={16} />}
                className="pagination-nav-button"
              >
                Próximo
              </Button>
            </div>

            <div className="pagination-info">
              Mostrando {Math.min(filteredDragons.length, (currentPage - 1) * itemsPerPage + 1)} -{" "}
              {Math.min(currentPage * itemsPerPage, filteredDragons.length)} de {filteredDragons.length} dragões
            </div>
          </div>
        </>
      )}
    </div>
  )
}
