import { MultiSelect } from "react-multi-select-component";
import CustomInputs from "../../customComponents/customInputs";
import { useCCToMaster } from "../../Utilities/Util";

export const EscalationDetails = ({
  rowId,
  handleRole,
  role,
  handler,
  selectedTAT,
  selectedValue,
  handleChangeCCTO,
  selectedCCTO,
}) => {
  const ccToMaster = useCCToMaster();
  console.log("check", ccToMaster);

  //
  return (
    <tr id={"row" + rowId} className="mt-2">
      <td className="col-sm-1 col-form-label">Level {rowId}</td>

      <td className="col-sm-1 col-form-label">ROLE</td>
      <td className="col-sm-2">
        <select
          id={"row" + rowId}
          name={"row" + rowId}
          value={role}
          onChange={(e) => handleRole(e.target.value)}
          className="form-select"
        >
          <option>option</option>
          {ccToMaster.map((crop) => (
            <option key={crop.id} value={crop.id}>
              {crop.name}
            </option>
          ))}
        </select>
      </td>

      <td className="col-sm-1 col-form-label">TAT</td>
      <td className="col-sm-2 ">
        <input
          type="number"
          className="form-control"
          id={"row" + rowId}
          name={"row" + rowId}
          value={selectedTAT}
          onChange={(e) => handler(e.target.value)}
          placeholder="Enter TAT"
        />
      </td>

      <td className="col-sm-1 col-form-label"> CC TO</td>
      <td className="col-sm-2">
        <MultiSelect
          options={ccToMaster.map((item) => ({
            label: item.name,
            value: item.id,
          }))}
          id={"row" + rowId}
          name={"row" + rowId}
          value={selectedCCTO}
          onChange={handleChangeCCTO}
          labelledBy="Select"
          overrideStrings={{ selectSomeItems: "Select CC TO" }}
          renderValue={(selected) => {
            return (
              <div>
                {selected?.map((selectedItem, index) => (
                  <span key={index}>{selectedItem?.id}</span>
                ))}
              </div>
            );
          }}
        />
      </td>
    </tr>
  );
};
