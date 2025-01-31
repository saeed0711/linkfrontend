import React, { useState } from "react";
 import "../css/ModalComponent.css"
const ModalComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      {/* Button to open modal */}
      <button onClick={openModal} className="open-modal-btn">
        Open Modal
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal">
           <div className="upper">
           <button onClick={closeModal} className="close-modal-btn">
              ✕
            </button>
            <h2 className="modal-title" style={{marginLeft:"1px"}}>New Link</h2>
           </div>

            {/* Form */}
            <form>
              <div className="form-group">
                <label>
                  Destination Url <span className="required">*</span>
                </label>
                <input
                  type="url"
                  className="form-control"
                  placeholder="https://example.com"
                  required
                />
              </div>

              <div className="form-group">
                <label>
                  Remarks <span className="required">*</span>
                </label>
                <textarea
                  className="form-control"
                  placeholder="Add remarks"
                  rows="4"
                  required
                ></textarea>
              </div>

              <div className="form-group form-inline">
                <label>Link Expiration</label>
                <input type="checkbox" />
              </div>

              <div className="form-group">
                <input type="date" className="form-control" />
              </div>

              <div className="form-actions">
               
                <button type="reset"  className=" btn-secondary">
                  Clear
                </button>
                <button type="submit" className=" btn-primary">
                  Create new
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalComponent;
