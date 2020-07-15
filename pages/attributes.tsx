import React, { useState } from 'react';
import Layout from '../components/Layout/Layout';
import attributeTable from '../assets/attributes.json';
import { AttributeTableModel } from '../models/attributeTable.model';
import { textLabels } from '../models/attributeTableTextLabels.viewmodel';
import MUIDataTable from 'mui-datatables';
import PropTypes from 'prop-types';

const AttributePage = (props: any) => {
  const [responsive, setResponsive] = useState('simple');
  const columns = [
    {
      label: 'Name',
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return <a href={tableMeta.rowData[3]} target={'blank'}>{value}
            {!tableMeta.rowData[5] ? <span title={'Not yet implemented'}>&nbsp;N/A</span> : ''}
          </a>
        }
      }
    }, {
      label: 'Description'
    }, {
      label: 'Example',
      options: {
        searchable: false,
        sort: false,
        customBodyRender: (value) => <pre>{value}</pre>
      }
    }, {
      label: 'Link',
      options: {
        display: 'excluded'
      }
    }, {
      label: 'Removed'
    }, {
      label: 'Implemented',
      options: {
        display: 'excluded'
      }
    }
  ];

  // @see https://github.com/gregnb/mui-datatables#usage
  const options = {
    filter: false,
    download: false,
    rowsPerPageOptions: [5, 10, 20],
    selectToolbarPlacement: 'none',
    responsive,
    onRowClick: (d) => {
      console.log('row click', d);
    },
    textLabels: textLabels
  };

  return (
    <Layout>
      <h2>Sprite generation script mode of behaviour</h2>

      <MUIDataTable
        title={'Attributes that are removed by the SVG Sprite Generator'}
        data={props.data}
        columns={columns}
        options={options}
      />
    </Layout>
  );
}

// A page containing getInitialProps renders at runtime
AttributePage.getInitialProps = async ({ query, req }) => {
  function mapUiDataTable(data): AttributeTableModel[] {
    return data.map((attr: AttributeTableModel) =>
      [
        attr.name,
        attr.description,
        attr.example,
        attr.link,
        attr.byDefault ? 'by default' : 'optionally',
        attr.implemented
      ]
    );
  }

  // Req only exists on server side
  if (req) {
    console.log('AttributePage - executed on server side', req.url);

    return {
      data: mapUiDataTable(attributeTable)
    }
  }

  // Window only exists on client side
  if (typeof window !== 'undefined') {
    const response = await fetch('/api/svg').then(res => res.json());

    console.log('AttributePage - executed on client side', response);

    return {
      data: mapUiDataTable(response)
    };
  }
};

AttributePage.propTypes = {
  data: PropTypes.array
};

export default AttributePage;
