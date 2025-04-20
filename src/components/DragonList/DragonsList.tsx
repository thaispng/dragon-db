"use client"

import { useState } from "react"
import "./dragons-list.css"

interface Dragon {
  id: string
  name: string
  type: string
}

interface DragonsListProps {
  dragons: Dragon[]
}

export function DragonsList({ dragons }: DragonsListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilter, setActiveFilter] = useState<string | null>(null)

  const filteredDragons = dragons.filter((dragon) => {
    const matchesSearch =
      dragon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dragon.type.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter = !activeFilter || dragon.type.toLowerCase() === activeFilter.toLowerCase()

    return matchesSearch && matchesFilter
  })

  const dragonTypes = Array.from(new Set(dragons.map((dragon) => dragon.type)))

  const getTypeClass = (type: string) => {
    switch (type.toLowerCase()) {
      case "fire":
      case "fogo":
        return "badge-fire"
      case "ice":
      case "gelo":
        return "badge-ice"
      case "earth":
      case "terra":
        return "badge-earth"
      case "lightning":
      case "relâmpago":
      case "electric":
        return "badge-lightning"
      case "wind":
      case "vento":
      case "air":
      case "ar":
        return "badge-wind"
      default:
        return "badge-default"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "fire":
      case "fogo":
        return "🔥"
      case "ice":
      case "gelo":
        return "❄️"
      case "earth":
      case "terra":
        return "🌍"
      case "lightning":
      case "relâmpago":
      case "electric":
        return "⚡"
      case "wind":
      case "vento":
      case "air":
      case "ar":
        return "💨"
      default:
        return "🐉"
    }
  }

  return (
    <div className="dragons-container">
      <div className="dragons-header">
        <h1 className="dragons-title">Coleção de Dragões</h1>
        <p className="dragons-subtitle">
          Explore nossa coleção de dragões lendários de diferentes tipos e habilidades.
        </p>
      </div>

      <div className="search-container">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Buscar por nome ou tipo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      {dragonTypes.length > 0 && (
        <div className="filter-container">
          {dragonTypes.map((type) => (
            <button
              key={type}
              className={`filter-badge ${getTypeClass(type)} ${activeFilter === type.toLowerCase() ? "active" : ""}`}
              onClick={() =>
                activeFilter === type.toLowerCase() ? setActiveFilter(null) : setActiveFilter(type.toLowerCase())
              }
            >
              <span className="filter-icon">{getTypeIcon(type)}</span>
              {type}
            </button>
          ))}
        </div>
      )}

      {filteredDragons.length === 0 ? (
        <div className="no-results">
          <p>Nenhum dragão encontrado com o termo "{searchTerm}".</p>
          <button
            className="clear-button"
            onClick={() => {
              setSearchTerm("")
              setActiveFilter(null)
            }}
          >
            Limpar filtros
          </button>
        </div>
      ) : (
        <div className="dragons-grid">
          {filteredDragons.map((dragon) => (
            <div key={dragon.id} className="dragon-card">
              <div className="dragon-header">
                <h2 className="dragon-name">{dragon.name}</h2>
                <span className={`dragon-type-badge ${getTypeClass(dragon.type)}`}>
                  <span className="dragon-type-icon">{getTypeIcon(dragon.type)}</span>
                  {dragon.type}
                </span>
              </div>
              <div className="dragon-content">
                <div className={`dragon-symbol ${getTypeClass(dragon.type)}`}>
                  <span>{getTypeIcon(dragon.type)}</span>
                </div>
                <p className="dragon-description">Dragão lendário do elemento {dragon.type.toLowerCase()}</p>
              </div>
              <div className="dragon-footer">
                <span className="dragon-id">ID: {dragon.id.substring(0, 8)}</span>
                <button className="details-button">
                  <span className="details-icon">ℹ️</span>
                  <span>Detalhes</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
