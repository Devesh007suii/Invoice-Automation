import React, { useState } from 'react';

const auditSheet = ({
  storeName,
  storeAddress,
  storeOwnerName,
  bamboo,
  perfora,
  brandName,
  qty,
  selectedValue,
  finalProductList,
  mrp,
  tax,
  margin
}) => {




  let i = 0;

  let j = 0;

  let k = 0;

  let l = 0;

  let m = 0;

  let n = 0;

  let o = 0;

  let p = 0;

  

  

  

  

  let rate = [];

  let taxableValue = [];

  let rateCGST = [];

  let AmountCGST = [];

  let rateSGST = [];

  let AmountSGST = [];

  let TotalAmount = [];

  const Rate = (j) => {
    const rateValue = ((mrp[j] / (100 + tax)) * 100).toFixed(2);
    rate.push(rateValue);
    console.log(rateValue)
    return rateValue;
  };

  const TaxableValue = (k) => {
    const taxableValueResult = ((rate[k] - (rate[k] * margin)) * qty[k]).toFixed(2);
    taxableValue.push(taxableValueResult);
    return taxableValueResult;
  };

  const totalTaxableValue = ()=>{
    let sum=0;
    for(let i=0;i<taxableValue.length;i++)
    {
      sum+=Number(taxableValue[i]);
    }
    return (sum).toFixed(2);
  }

  const RateCGST = (l) => {
    const rateCGSTResult = (tax / 200) * 100;
    rateCGST.push(rateCGSTResult);
    return rateCGSTResult;
  };

  const amountCGST = (m) => {
    const AmountCGSTResult = (taxableValue[m] * (rateCGST[m] / 100)).toFixed(2);
    AmountCGST.push(AmountCGSTResult);
    return AmountCGSTResult;
  };

  const TotalCgstAmount = ()=>{
    let sum=0;
    for(let i=0;i<AmountCGST.length;i++)
    {
      sum+=Number(AmountCGST[i]);
    }
    return sum.toFixed(2);
  }

  const TotalSgstAmount = ()=>{
    let sum=0;
    for(let i=0;i<AmountSGST.length;i++)
    {
      sum+=Number(AmountSGST[i]);
    }
    return sum.toFixed(2);
  }

  const RateSGST = (n) => {
    const rateSGSTResult = (tax / 200) * 100;
    rateSGST.push(rateSGSTResult)
    return rateSGSTResult;
  };

  const amountSGST = (o) => {
    const AmountSGSTResult = (taxableValue[o] * (rateSGST[o] / 100)).toFixed(2);
    AmountSGST.push(AmountSGSTResult);
    return AmountSGSTResult;
  };

  const totalAmount = (p) => {
    const numericTaxableValue1 = parseFloat(taxableValue[p]);
    const numericAmountCGST = parseFloat(AmountCGST[p]);
    const numericAmountSGST = parseFloat(AmountSGST[p]);

    const TotalAmountResult = (numericTaxableValue1 + numericAmountCGST + numericAmountSGST).toFixed(2);
    TotalAmount.push(TotalAmountResult);
    
    return TotalAmountResult;
  };

  const finalTotalAmount = ()=>{
    let sum=0;
    for(let i=0;i<TotalAmount.length;i++)
    {
      sum+=Number(TotalAmount[i]);
    }
    return sum.toFixed(2);
  }

  return (
    <div style={styles.auditsheet}>
      <div style={styles.info}>
        <div style={{ textAlign: 'center' }}>
          NEURALNEXT PRIVATE LIMITED (STANDARDE)
        </div>
        <div style={{ textAlign: 'center' }}>
          Address : 410, 4th Floor, 55 Sukhniwas, Mangalwar Peth, Pune 411011 |
          GST No.: 27AAGCN5686C1Z9 |
        </div>
        <div style={{ textAlign: 'center' }}>
          | Email : info@neuralnextsystems.com | Contact : 8805520651 |
        </div>
      </div>

      <table>
        <div>STORE NAME: {storeName}</div>
        <div>STORE OWNER NAME: {storeOwnerName}</div>
        <div>STORE ADDRESS: {storeAddress}</div>
      </table>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={{ ...styles.th, width: '1px' }}>#</th>
            <th style={styles.th}>Item Description</th>
            <th style={styles.th}>HSN</th>
            <th style={styles.th}>Qty</th>
            <th style={styles.th}>MRP (IOT)</th>
            <th style={styles.th}>TAX</th>
            <th style={styles.th}>Rate</th>
            <th style={styles.th}>Margin</th>
            <th style={styles.th}>Taxable Value</th>
            <th style={styles.th}>CGST</th>
            <th style={styles.th}>SGST</th>
            <th style={styles.th}>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {finalProductList.map((val, key) => (
              <tr key={key}>
                <td style={styles.td}>{key + 1}</td>
                <td style={styles.td}>{val}</td>
                <td style={styles.td}></td>
                <td style={styles.td}></td>
                {key === i++ ? (
                  <>
                    <td style={styles.td}>{mrp[i-1]}</td>
                  </>
                ) : (
                  <td style={styles.td}></td>
                )}
                <td style={styles.td}>
                  <td>{tax}</td>
                </td>

                {key < finalProductList.length && key === j++ ? (
                  <td style={styles.td}>{Rate(j-1)}</td>
                ) : (
                  <td style={styles.td}></td>
                )}

                <td style={styles.td}>
                  <td>{margin*100}%</td>
                </td>

                {key < finalProductList.length && key === k++ ? (
                  <td style={styles.td}>{TaxableValue(k-1)}</td>
                ) : (
                  <td style={styles.td}></td>
                )}
                {key < finalProductList.length && key === l++ && key === m++ ? (
                  <td style={styles.td}>
                    <table style={styles.innerTable}>
                      <tr>
                        <td style={styles.innerTd}>{RateCGST(l-1)}%</td>
                        <td style={styles.innerTd}>{amountCGST(m-1)}</td>
                      </tr>
                      {/* Add more rows as needed */}
                    </table>
                  </td>
                ) : (
                  <td style={styles.td}></td>
                )}

                {key < finalProductList.length && key === n++ && key === o++  ? (
                  <td style={styles.td}>
                    <table style={styles.innerTable}>
                      <tr>
                        <td style={styles.innerTd}>{RateSGST(n-1)}%</td>
                        <td style={styles.innerTd}>{amountSGST(o-1)}</td>
                      </tr>
                      {/* Add more rows as needed */}
                    </table>
                  </td>
                ) : (
                  <td style={styles.td}></td>
                )}
                {key === p++ ? (
                  <td style={styles.td}>{totalAmount(p-1)}</td>
                ) : (
                  <td style={styles.td}></td>
                )}
              </tr>
            ))
          }
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style={styles.td}>{totalTaxableValue()}</td>
            <td style={{ ...styles.td, textAlign: 'right' }}>{TotalCgstAmount()}</td>
            <td style={{ ...styles.td, textAlign: 'right' }}>{TotalSgstAmount()}</td>
            <td style={styles.td}>{finalTotalAmount()}</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td style={styles.td}>Gross Total</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default auditSheet;

const styles = {
  auditsheet: {
    width: '100%',
    justifyContent: 'center',
  },

  info: {
    marginBottom: '20px',
    marginTop: '20px',
    paddingLeft: '20px',
  },

  infoLabel: {
    marginRight: '5px',
    fontWeight: 'bold',
  },
  infoValue: {
    fontWeight: 'bold',
  },
  tr: {
    width: '100%',
    border: '1px solid black',
    padding: '8px',
  },
  table: {
    border: '2px solid',
    width: '100%',
    margin: '0 auto', // Add margin to center the table horizontally
    marginLeft: '20px', // Add left margin
    marginRight: '200px', // Add right margin
  },
  th: {
    border: '1px solid black',
    padding: '8px',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  td: {
    border: '1px solid black',
    padding: '8px',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  innerTable: {
    borderCollapse: 'collapse',
    width: '100%',
  },
  innerTd: {
    border: '1px solid black',
    padding: '8px',
    textAlign: 'center',
    fontWeight: 'bold',
  },
};
