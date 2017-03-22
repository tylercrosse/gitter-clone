import path from 'path';

export const getDCV = (req, res) => {
  const filename = '25716D9DF9801A2B91D3874529F091F2.txt';
  const options = {
    root: path.resolve(__dirname, '../../../'),
    dotfiles: 'deny',
    headers: {
      'x-timestamp': Date.now(),
      'x-sent': true
    }
  };

  res.status(200).sendFile(filename, options);
};
