"use client"

import { useState, useEffect, useRef } from "react"
import { Trash2, AlertTriangle } from "lucide-react"
import "./delete-modal.css"

interface DeleteModalProps {
  title?: string
  description?: string
  itemName?: string
  onDelete: () => void
  buttonClassName?: string
}

export function DeleteModalPure({
  title = "Excluir item",
  description = "Tem certeza que deseja excluir este item? Esta ação não pode ser desfeita.",
  itemName,
  onDelete,
  buttonClassName = "",
}: DeleteModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const cancelButtonRef = useRef<HTMLButtonElement>(null)

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  const handleDelete = () => {
    onDelete()
    closeModal()
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeModal()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey)
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen && cancelButtonRef.current) {
      setTimeout(() => {
        cancelButtonRef.current?.focus()
      }, 100)
    }
  }, [isOpen])

  return (
    <>
      <button onClick={openModal} className={`delete-button ${buttonClassName}`} aria-label="Excluir">
        <Trash2 size={18} />
      </button>

      {isOpen && (
        <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <div className="modal-container">
            <div ref={modalRef} className="modal-content">
              <div className="modal-header">
                <h2 className="modal-title" id="modal-title">
                  {title}
                </h2>
                <button className="modal-close" onClick={closeModal} aria-label="Fechar">
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <div className="modal-icon">
                  <AlertTriangle size={24} />
                </div>
                <p className="modal-description">
                  {itemName ? (
                    <>
                      {description.replace("este item", "")} <span className="item-name">"{itemName}"</span>?
                    </>
                  ) : (
                    description
                  )}
                </p>
              </div>
              <div className="modal-footer">
                <button ref={cancelButtonRef} className="modal-button cancel" onClick={closeModal}>
                  Cancelar
                </button>
                <button className="modal-button delete" onClick={handleDelete}>
                  Excluir
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
