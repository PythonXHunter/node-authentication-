for file in *.pub;do
  mv "$file" "${file%.pub}.pug"
done
echo "done"