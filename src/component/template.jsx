import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Auditsheet from './auditSheet';
import { read } from 'xlsx';
import Select from 'react-select';

const Template = () => {
  const [postSubmitted, setPostSubmitted] = useState(false);
  const [filteredStoreNames, setFilteredStoreNames] = useState([]);
  const [storeName, setStoreName] = useState('');
  const [filteredStoreAddress, setFilteredStoreAddress] = useState([]);
  const [filteredStoreOwnerName, setFilteredStoreOwnerName] = useState([]);
  const [storeAddress, setStoreAddress] = useState('');
  const [storeOwnerName, setStoreOwnerName] = useState('');
  const [filteredBrandNames, setFilteredBrandNames] = useState([]);
  const [brandName, setBrandName] = useState('');

  const [bamboo, setBamboo] = useState([]);
  const [bambooProduct, setBambooProduct] = useState("");
  const [bambooMrp, setBambooMrp] = useState("");
  const [bambooProductMrp, setBambooProductMrp] = useState([])

  const [perfora, setPerfora] = useState([]);
  const [perforaProduct, setPerforaProduct] = useState("");
  const [peforaMrp, setPerforaMrp] = useState("");
  const [perforaProductMrp, setPerforaProductMrp] = useState([])

  const [qty, setQty] = useState([]);
  const [productArray, setProductArray] = useState([]);

  const [tax, setTax] = useState("");
  const [margin, setMargin] = useState("");

  const [perforaTax, setPerforaTax] = useState("");
  const [perforaMargin, setPerforaMargin] = useState("");

  const [bambooTax, setBambooTax] = useState("");
  const [bambooMargin, setBambooMargin] = useState("");

  const [finalProductList, setFinalProductList] = useState([]);
  const [finalProductMrpList, setFinalProductMrpList] = useState([]);
  
  const [selectedValue, setSelectedValue] = useState([]);

  const numDivs = () => {
    if (brandName === 'Bamboo India') {
      return selectedValue.length;
    }
    if (brandName === 'Perfora') {
      return selectedValue.length;
    }
  };

  useEffect(() => {
    if (filteredStoreAddress) {
      const selectedStoreAddress = filteredStoreAddress.find(
        (address, index) => filteredStoreNames[index] === storeName
      );
      setStoreAddress(selectedStoreAddress || '');
    }
  }, [storeName, filteredStoreNames, filteredStoreAddress]);

  useEffect(() => {
    if (filteredStoreOwnerName) {
      const selectedStoreOwnerName = filteredStoreOwnerName.find(
        (address, index) => filteredStoreNames[index] === storeName
      );
      setStoreOwnerName(selectedStoreOwnerName || '');
    }
  }, [storeName, filteredStoreNames, filteredStoreAddress]);

  useEffect(()=>{
    if(brandName==="Perfora")
    {
      setProductArray(perforaProductMrp);
      setTax(perforaTax);
      setMargin(perforaMargin);
    }
    if(brandName==="Bamboo India")
    {
      setProductArray(bambooProductMrp);
      setTax(bambooTax);
      setMargin(bambooMargin);
    }
  })

  

  const handleSubmit = event => {
    event.preventDefault();
    setPostSubmitted(true);
  };

  const handleStoreNameChange = selectedOption => {
    setStoreName(selectedOption ? selectedOption.value : '');
  };

  const handleBrandNameChange = selectedOption => {
    setBrandName(selectedOption ? selectedOption.value : '');
  };

  const handleStoreAddressChange = event => {
    setStoreAddress(event.target.value);
  };

  const handleStoreOwnerNameChange = event => {
    setStoreOwnerName(event.target.value);
  };

  const handleFileUpload = event => {
    const file = event.target.files[0];

    // Read the XLSX file
    const reader = new FileReader();
    reader.onload = function (e) {
      const data = new Uint8Array(e.target.result);
      const workbook = read(data, { type: 'array' });

      const sheetNameForStoreNames = workbook.SheetNames[1];
      const worksheetForStoreNames = workbook.Sheets[sheetNameForStoreNames];

      const sheetNameForStoreAddress = workbook.SheetNames[1];
      const worksheetForStoreAddress =
        workbook.Sheets[sheetNameForStoreAddress];

      const sheetNameForStoreOwnerName = workbook.SheetNames[1];
      const worksheetForStoreOwnerName =
        workbook.Sheets[sheetNameForStoreOwnerName];

      const columnForStoreNames = 'C';
      const columnForStoreAddress = 'G';
      const columnForStoreOwnerName = 'E';

      const valuesForStoreNames = [];
      const valuesForStoreAddress = [];
      const valuesForStoreOwnerName = [];

      let rowForStoreNames = 2;

      let cellAddressForStoreNames = columnForStoreNames + rowForStoreNames;
      let cellAddressForStoreAddress = columnForStoreAddress + rowForStoreNames;
      let cellAddressForStoreOwnerName =
        columnForStoreOwnerName + rowForStoreNames;

      let cellValueForStoreNames =
        worksheetForStoreNames[cellAddressForStoreNames]?.v;

      let cellValueForStoreAddress =
        worksheetForStoreAddress[cellAddressForStoreAddress]?.v;

      let cellValueForStoreOwnerName =
        worksheetForStoreOwnerName[cellAddressForStoreOwnerName]?.v;

      let breakTheLoopForStoreNames = 0;

      while (breakTheLoopForStoreNames !== 3) {
        valuesForStoreNames.push(cellValueForStoreNames);
        valuesForStoreAddress.push(cellValueForStoreAddress);
        valuesForStoreOwnerName.push(cellValueForStoreOwnerName);

        rowForStoreNames++;

        cellAddressForStoreNames = columnForStoreNames + rowForStoreNames;
        cellAddressForStoreAddress = columnForStoreAddress + rowForStoreNames;
        cellAddressForStoreOwnerName =
          columnForStoreOwnerName + rowForStoreNames;

        cellValueForStoreNames =
          worksheetForStoreNames[cellAddressForStoreNames]?.v;

        cellValueForStoreAddress =
          worksheetForStoreAddress[cellAddressForStoreAddress]?.v;

        cellValueForStoreOwnerName =
          worksheetForStoreOwnerName[cellAddressForStoreOwnerName]?.v;

        if (cellValueForStoreNames === undefined) {
          breakTheLoopForStoreNames++;
        } else {
          breakTheLoopForStoreNames = 0;
        }
      }

      setFilteredStoreNames(valuesForStoreNames);
      setFilteredStoreAddress(valuesForStoreAddress);
      setFilteredStoreOwnerName(valuesForStoreOwnerName);

      const sheetNameForBrands = workbook.SheetNames[0];
      const worksheetForBrands = workbook.Sheets[sheetNameForBrands];

      const columnForBrands = 'A';
      const valuesForBrands = [];
      let rowForBrands = 1;
      let cellAddressForBrands = columnForBrands + rowForBrands;
      let cellValueForBrands = worksheetForBrands[cellAddressForBrands]?.v;
      let breakTheLoopForBrands = 0;

      while (breakTheLoopForBrands !== 3) {
        valuesForBrands.push(cellValueForBrands);
        rowForBrands++;
        cellAddressForBrands = columnForBrands + rowForBrands;
        cellValueForBrands = worksheetForBrands[cellAddressForBrands]?.v;
        if (cellValueForBrands === undefined) {
          breakTheLoopForBrands++;
        } else {
          breakTheLoopForBrands = 0;
        }
      }

      setFilteredBrandNames(valuesForBrands);

      const sheetNameForPerfora = workbook.SheetNames[3];
      const worksheetForPerfora = workbook.Sheets[sheetNameForPerfora];

      const columnForPerfora = 'B';
      const columnForPerforaMrp = "C"
      const columnForPerforaTax = "D"
      const columnForPerforaMargin = "E"

      const valuesForPerfora = [];
      const valuesForPerforaMrp = [];
      

      let rowForPerfora = 2;

      let cellAddressForPerfora = columnForPerfora + rowForPerfora;
      let cellAddressForPerforaMrp = columnForPerforaMrp + rowForPerfora;
      let cellAddressForPerforaTax = columnForPerforaTax + rowForPerfora;
      let cellAddressForPerforaMargin = columnForPerforaMargin + rowForPerfora;

      let cellValueForPerfora = worksheetForPerfora[cellAddressForPerfora]?.v;
      let cellValueForPerforaMrp = worksheetForPerfora[cellAddressForPerforaMrp]?.v;
      let cellValueForPerforaTax = worksheetForPerfora[cellAddressForPerforaTax]?.v;
      let cellValueForPerforaMargin = worksheetForPerfora[cellAddressForPerforaMargin]?.v;

    

      setPerforaTax(cellValueForPerforaTax);
      setPerforaMargin(cellValueForPerforaMargin);
      

      let breakTheLoopForPerfora = 0;

      while (breakTheLoopForPerfora !== 3) {
        valuesForPerfora.push(cellValueForPerfora);
        valuesForPerforaMrp.push(cellValueForPerforaMrp);
        

        rowForPerfora++;

        cellAddressForPerfora = columnForPerfora + rowForPerfora;
        cellAddressForPerforaMrp = columnForPerforaMrp + rowForPerfora;

        cellValueForPerfora = worksheetForPerfora[cellAddressForPerfora]?.v;
        cellValueForPerforaMrp = worksheetForPerfora[cellAddressForPerforaMrp]?.v;


        if (cellValueForPerfora === undefined) {
          breakTheLoopForPerfora++;
        } else {
          breakTheLoopForPerfora = 0;
        }
      }

      setPerfora(valuesForPerfora);
      setPerforaMrp(valuesForPerforaMrp)
      

      const mergePerforaMrp = valuesForPerfora.map((name, index)=>({
        Product: name,
        Mrp: valuesForPerforaMrp[index]
      }))

      

      setPerforaProductMrp(mergePerforaMrp);

      const sheetNameForBamboo = workbook.SheetNames[2];

      const worksheetForBamboo = workbook.Sheets[sheetNameForBamboo];

      const columnForBamboo = 'B';
      const columnForBambooMrp = 'C';
      const columnForBambooTax = 'D';
      const columnForBambooMargin = 'E';
      
      const valuesForBamboo = [];
      const valuesForBambooMrp = [];
      
      
      let rowForBamboo = 2;

      let cellAddressForBamboo = columnForBamboo + rowForBamboo;
      let cellAddressForBambooMrp = columnForBambooMrp + rowForBamboo;
      let cellAddressForBambooTax = columnForBambooTax + rowForBamboo;
      let cellAddressForBambooMargin = columnForBambooMargin + rowForBamboo;

      let cellValueForBamboo = worksheetForBamboo[cellAddressForBamboo]?.v;
      let cellValueForBambooMrp = worksheetForBamboo[cellAddressForBambooMrp]?.v;
      let cellValueForBambooTax = worksheetForBamboo[cellAddressForBambooTax]?.v;
      let cellValueForBambooMargin = worksheetForBamboo[cellAddressForBambooMargin]?.v;

      setBambooTax(cellValueForBambooTax);
      setBambooMargin(cellValueForBambooMargin);

      let breakTheLoopForBamboo = 0;

      while (breakTheLoopForBamboo !== 3) {
        valuesForBamboo.push(cellValueForBamboo);
        valuesForBambooMrp.push(cellValueForBambooMrp);
        

        rowForBamboo++;

        cellAddressForBamboo = columnForBamboo + rowForBamboo;
        cellAddressForBambooMrp = columnForBambooMrp + rowForBamboo;

        cellValueForBamboo = worksheetForBamboo[cellAddressForBamboo]?.v;
        cellValueForBambooMrp = worksheetForBamboo[cellAddressForBambooMrp]?.v;


        if (cellValueForBamboo === undefined) {
          breakTheLoopForBamboo++;
        } else {
          breakTheLoopForBamboo = 0;
        }
      }

      setBamboo(valuesForBamboo);
      setBambooMrp(valuesForBambooMrp)
      console.log(valuesForBambooMrp)

      const mergeBambooMrp = valuesForBamboo.map((name, index)=>({
        Product: name,
        Mrp: valuesForBambooMrp[index]
      }))

      

      setBambooProductMrp(mergeBambooMrp);
    };

    reader.readAsArrayBuffer(file);
  };

  const optionsForStoreName = filteredStoreNames.map(name => ({
    value: name,
    label: name,
  }));

  const optionsForBrands = filteredBrandNames.map(name => ({
    value: name,
    label: name,
  }));

  const optionsForProducts = productArray.map(item => {
    const product = item.Product;
    const mrp = item.Mrp;
    return {
      value: `${product} - MRP ${mrp}`,
      label: `${product} - MRP ${mrp}`,
    };
  });
  

  


  const handleQuantityChange = (event, index) => {
    const newQty = [...qty];
    newQty[index] = event.target.value;
    setQty(newQty);
  };

  const handleChangeForProduct = (e) => {
    const products = [];
    const mrps = [];
    const selectedValues = Array.isArray(e) ? e.map(x => x.value) : [];
    
    if (Array.isArray(e)) {
      e.forEach(x => {
        const [product, mrp] = x.value.split(' - MRP ');
        products.push(product);
        mrps.push(mrp);
      });
    }
    
    setFinalProductList(products);
    setFinalProductMrpList(mrps);
    setSelectedValue(selectedValues);
  };
  
  

  

  return (
    <>
      {!postSubmitted ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <form className="template-form" onSubmit={handleSubmit}>
            <div className="row">
              <input
                style={{ marginBottom: '20px' }}
                type="file"
                accept=".xlsx"
                onChange={handleFileUpload}
              />
            </div>
            
            <div className="form-group">
              <div className="mt-4">
                <label htmlFor="category">Brand Name</label>
                <Select
                  closeMenuOnSelect
                  isMulti={false}
                  options={optionsForBrands}
                  value={optionsForBrands.find(
                    option => option.value === brandName
                  )}
                  onChange={handleBrandNameChange}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="mt-4">
                <label htmlFor="category">Brand Products</label>
                <Select
                  closeMenuOnSelect
                  isMulti
                  options={optionsForProducts}
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={handleChangeForProduct}
                />
              </div>
            </div>
            <div>
              {/* Generate multiple divs */}
              {Array.from({ length: numDivs() }, (_, index) => (
                <div className="form-group" key={index}>
                  <label htmlFor={`quantity${index + 1}`}>
                    Quantity {index + 1}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id={`quantity${index + 1}`}
                    placeholder={`Enter Quantity ${selectedValue[index]}`}
                    value={qty[index]}
                    onChange={e => handleQuantityChange(e, index)}
                  />
                </div>
              ))}
            </div>
            <div className="form-group">
              <div className="mt-4">
                <label htmlFor="category">Store Name</label>
                <Select
                  closeMenuOnSelect
                  isMulti={false}
                  options={optionsForStoreName}
                  value={optionsForStoreName.find(
                    option => option.value === storeName
                  )}
                  onChange={handleStoreNameChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="storeAddress">Store Owner Name</label>
              <input
                type="text"
                className="form-control"
                id="storeOwnerName"
                placeholder="Store Owner Name..."
                value={storeOwnerName}
                onChange={handleStoreOwnerNameChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="storeAddress">Store Address</label>
              <input
                type="text"
                className="form-control"
                id="storeAddress"
                placeholder="Store Address..."
                value={storeAddress}
                onChange={handleStoreAddressChange}
              />
            </div>
            <button
              style={{ marginTop: '20px' }}
              type="submit"
              className="btn btn-primary"
            >
              Upload
            </button>
          </form>
        </div>
      ) : (
        <Auditsheet
          storeName={storeName}
          storeAddress={storeAddress}
          storeOwnerName={storeOwnerName}
          brandName={brandName}
          bamboo={bamboo}
          perfora={perfora}
          qty={qty}
          selectedValue={selectedValue}
          finalProductList={finalProductList}
          mrp={finalProductMrpList}
          tax={tax}
          margin={margin}
        />
      )}
    </>
  );
};

export default Template;
