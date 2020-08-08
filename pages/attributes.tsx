import { AttributeTableModel } from '../models/attributeTable.model';
import { textLabels } from '../models/attributeTableTextLabels.viewmodel';
import React, { useState } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout/Layout';
import attributeTable from '../assets/attributes.json';
import MUIDataTable from 'mui-datatables';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import HomeIcon from '@material-ui/icons/Home';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

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
      <Breadcrumbs aria-label="breadcrumb">
        <Link href='/'>
          <a className={'breadcrumbLink'}>
            <HomeIcon className={'breadcrumbIcon'} />
            Home
          </a>
        </Link>
        <Typography color="textPrimary">
          Attributes
        </Typography>
      </Breadcrumbs>

      <Typography variant="h4" component="h2">
        Stripping Attributes
      </Typography>

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

export default AttributePage;
