import 'bootstrap/dist/css/bootstrap.min.css';

const CreatePolygonForm = `
<form id="createPolygonForm" class="mx-auto mt-4 p-4 border rounded shadow-sm bg-light" style="max-width: 400px;">
  <div class="form-group mb-3">
    <label for="polygonName" class="form-label">Nazwa zagospodarowania:</label>
    <input type="text" name="name" class="form-control" id="polygonName" placeholder="Wprowadź nazwę" required>
  </div>

  <div class="form-group mb-3">
    <label for="polygonDescription" class="form-label">Opis:</label>
    <textarea name="description" class="form-control" id="polygonDescription" placeholder="Wprowadź opis" rows="5" required></textarea>
  </div>

  <div class="form-group mb-3">
    <label for="startDate" class="form-label">Data budowy:</label>
    <input type="date" name="startDate" class="form-control" id="startDate" required>
  </div>

  <button type="submit" class="btn btn-success">Wyślij</button>
</form>
`;

export default CreatePolygonForm;
