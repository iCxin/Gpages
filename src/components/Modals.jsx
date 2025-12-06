import React from 'react';
import { config, allSkills } from '../data';

const Modals = ({ activeId, onClose }) => {
  // Helper to create SVG path
  const createPath = (d) => {
    return d.includes('<') ? (
      <g dangerouslySetInnerHTML={{ __html: d }} />
    ) : (
      <path d={d} />
    );
  };

  return (
    <div id="modalContainer">
      {/* Social & Projects Modals */}
      {config.map((item) => {
        if (item.id === 'skills') return null;

        return (
          <div 
            key={item.id}
            className={`modal-overlay ${activeId === item.id ? 'active' : ''}`}
            id={`modal-${item.id}`}
            onClick={(e) => e.target.id === `modal-${item.id}` && onClose()}
          >
            <div className="modal-card">
              <div className="modal-header">
                <span className="modal-title">{item.title}</span>
                <button className="close-btn" onClick={onClose}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>
              <div className="link-list">
                {item.items.map((link, index) => (
                  <a 
                    key={index}
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="link-item" 
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <svg className="icon-svg" viewBox="0 0 24 24">
                      {createPath(link.iconPath)}
                    </svg>
                    {link.name}
                    {link.desc && <span className="link-desc">{link.desc}</span>}
                  </a>
                ))}
              </div>
            </div>
          </div>
        );
      })}

      {/* Skills Modal */}
      <div 
        className={`modal-overlay ${activeId === 'skills' ? 'active' : ''}`}
        id="modal-skills"
        onClick={(e) => e.target.id === 'modal-skills' && onClose()}
      >
        <div className="modal-card">
          <div className="modal-header">
            <span className="modal-title">我的技能</span>
            <button className="close-btn" onClick={onClose}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          <div className="skill-grid">
            {Object.values(allSkills).map((skill, index) => (
              <div key={index} className="skill-card">
                <div 
                  className="tech-item" 
                  style={{ width: '48px', height: '48px' }} 
                  data-name={skill.name}
                  onMouseEnter={(e) => e.currentTarget.style.color = skill.color}
                  onMouseLeave={(e) => e.currentTarget.style.color = ''}
                >
                  <svg viewBox="0 0 24 24">
                    <path d={skill.path} fill="currentColor"/>
                  </svg>
                </div>
                <span className="skill-name">{skill.fullName || skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modals;