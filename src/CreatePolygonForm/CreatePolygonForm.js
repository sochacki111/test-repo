const CreatePolygonForm = `
<form id="createPolygonForm" style="max-width: 400px; margin: 20px auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); background-color: #f9f9f9;">
<label style="display: block; margin-bottom: 8px;">
  Nazwa zagospodarowania:
  <input type="text" name="name" style="width: 100%; padding: 8px; margin-bottom: 10px; box-sizing: border-box; border: 1px solid #ccc; border-radius: 4px;">
</label>
<br />
<label style="display: block; margin-bottom: 8px;">
  Opis:
  <textarea name="description" style="width: 100%; height: 228px; resize: none; padding: 8px; margin-bottom: 10px; box-sizing: border-box; border: 1px solid #ccc; border-radius: 4px;"></textarea>
</label>
<br />
<label style="display: block; margin-bottom: 8px;">
  Data budowy:
  <input type="date" name="startDate" style="width: 100%; padding: 8px; margin-bottom: 10px; box-sizing: border-box; border: 1px solid #ccc; border-radius: 4px;">
</label>
<br />
<button type="submit" style="background-color: #4caf50; color: #fff; padding: 10px 15px; border: none; border-radius: 4px; cursor: pointer;">Wyślij</button>
</form>
`;

export default CreatePolygonForm;
