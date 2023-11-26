import React, { useState, useEffect } from 'react';
import './FetchedPolygons.css';
import { createComment } from '../api/bierun-api';
import { fetchPolygons } from '../api/bierun-api';
import { Popup, Polygon } from 'react-leaflet';

const FetchedPolygons = () => {
  const [polygons, setPolygons] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPolygons();
        setPolygons(data);
      } catch (error) {
        console.error('Error fetching polygons from useEffect:', error);
      }
    };

    fetchData();
  }, []);

  const [comment, setComment] = useState(`Szanowni Mieszkańcy,

Dziękujemy za wyrażenie swoich opinii i zrozumienie. 

Chcemy zapewnić, że każdy głos jest dla nas ważny, a wasze obawy i sugestie są notowane.
  
Z poważaniem,
Urząd Miasta Bieruń`);

  const handleCommentSubmit = async (e, polygonId) => {
    e.preventDefault();
    console.log('submitting comment:', comment, 'for polygonId:', polygonId);
    if (comment.trim() !== '') {
      await createComment({ id_plan: polygonId, text: comment });

      try {
        const updatedPolygons = await fetchPolygons();
        setPolygons(updatedPolygons);
      } catch (error) {
        console.error(
          'Error fetching polygons after submitting comment:',
          error,
        );
      }

      setComment('');
    }
  };

  return (
    <>
      {polygons &&
        polygons.map((polygonData) => (
          <Polygon
            key={polygonData.id}
            positions={polygonData.coordinates}
            color="blue"
          >
            <Popup key={polygonData.id}>
              <div className="popup-container">
                <h1>{polygonData.name}</h1>
                <p>{polygonData.description}</p>
                {polygonData.comments && polygonData.comments.length > 0 && (
                  <div>
                    <h4>Komentarze:</h4>
                    <ul>
                      {polygonData.comments.map((comment) => (
                        <li key={comment.id}>{comment.text}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <form
                  onSubmit={(e) =>
                    handleCommentSubmit(
                      e,
                      polygonData.id || polygonData.id_plan,
                    )
                  }
                  className="comment-form"
                >
                  <label>
                    Dodaj komentarz:
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Wpisz swój komentarz..."
                    />
                  </label>
                  <button type="submit">Dodaj komentarz</button>
                </form>
              </div>
            </Popup>
          </Polygon>
        ))}
    </>
  );
};

export default FetchedPolygons;
