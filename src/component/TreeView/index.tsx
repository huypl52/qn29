import React, { useState } from 'react';
import { Treebeard } from 'react-treebeard';

const data = {
  name: 'root',
  toggled: true,
  children: [
    {
      name: 'parent',
      children: [
        { name: 'child1' },
        { name: 'child2' }
      ]
    },
    {
      name: 'loading parent',
      loading: true,
      children: []
    },
    {
      name: 'parent',
      children: [
        {
          name: 'nested parent',
          children: [
            { name: 'nested child 1' },
            { name: 'nested child 2' }
          ]
        }
      ]
    }
  ]
};


const customTheme = {
  tree: {
    base: {
      backgroundColor: 'rgba(243,244,246,0.4)',
      color: '#000',
      fontSize: '1rem',
      padding: '1.6rem 0',
      height: 'calc(100vh - 4rem)',
      minWidth: '10vw',
      marginRight: '1rem',
    },
    node: {
      activeLink: {
        background: 'rgba(243,244,246,1)'
      },
      link: {
        cursor: 'pointer',
        position: 'relative',
        padding: '0 1rem',
        display: 'block'
      },
      toggle: {
        base: {
          position: 'relative',
          display: 'inline-block',
          verticalAlign: 'top',
          marginLeft: '-0.5rem',
          height: '1.5rem',
          width: '1.5rem'
        },
        wrapper: {
          position: 'absolute',
          top: '50%',
          left: '50%',
          margin: '-0.5rem 0 0 -0.5rem',
          height: '1rem'
        },
        height: 14,
        width: 14,
        arrow: {
          fill: '#000',
          strokeWidth: 0
        }
      },
      header: {
        base: {
          display: 'inline-block',
          verticalAlign: 'top',
          color: '#000'
        },
        connector: {
          width: '2px',
          height: '12px',
          borderLeft: 'solid 2px #9DA5AB',
          borderBottom: 'solid 2px #9DA5AB',
          position: 'absolute',
          top: '0px',
          left: '-21px'
        },
        title: {
          lineHeight: '1.2rem',
          verticalAlign: 'middle'
        }
      },
      subtree: {
        listStyle: 'none',
        paddingLeft: '1.2rem'
      },
      loading: {
        color: 'rgba(255, 0, 0, 0.8)'
      }
    }
  }
};

const TreeView = () => {
  const [treeData, setTreeData] = useState(data);
  const [cursor, setCursor] = useState(null);

  const onToggle = (node, toggled) => {
    if (cursor) {
      cursor.active = false;
    }
    node.active = true;
    if (node.children) {
      node.toggled = toggled;
    }
    setCursor(node);
    setTreeData(Object.assign({}, treeData));
  };

  return (
    <div className="">
      <Treebeard
        data={treeData}
        onToggle={onToggle}
        style={customTheme}
      />
    </div>
  );
};

export default TreeView;
