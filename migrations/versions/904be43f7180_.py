"""empty message

Revision ID: 904be43f7180
Revises: 93eb8758a103
Create Date: 2023-11-23 15:50:41.449011

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '904be43f7180'
down_revision = '93eb8758a103'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('Task',
    sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
    sa.Column('title', sa.String(length=255), nullable=False),
    sa.Column('creation_date', sa.DateTime(), nullable=False),
    sa.Column('done', sa.Boolean(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    with op.batch_alter_table('Task', schema=None) as batch_op:
        batch_op.create_index(batch_op.f('ix_Task_title'), ['title'], unique=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('Task', schema=None) as batch_op:
        batch_op.drop_index(batch_op.f('ix_Task_title'))

    op.drop_table('Task')
    # ### end Alembic commands ###
